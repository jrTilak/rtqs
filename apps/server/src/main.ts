import "./scripts/init";
import * as fs from "node:fs";
import * as path from "node:path";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import * as express from "express";
import { AppModule } from "@/app.module";
import { ResponseInterceptor } from "@/common/interceptors/response.interceptor";
import { AppValidationPipe } from "@/common/pipe/app-validation.pipe";
import { APP_CONFIG } from "@/config/app.config";
import { Logger } from "@/lib/logger";
import "reflect-metadata";
import { auth } from "./lib/auth";

const GLOBAL_PREFIX = "/api/";

const logger = new Logger("Bootstrap");

logger.warn(`Warning: NODE_ENV is set to ${process.env.NODE_ENV}`);

const PORT = process.env.SERVER_PORT || 5000;

async function bootstrap() {
  const app = (
    await NestFactory.create(AppModule, {
      bodyParser: false, // this is required by better auth, and after that better auth will automatically add body parser
    })
  ).setGlobalPrefix(GLOBAL_PREFIX);

  logger.info(`Starting server... on port ${PORT} http://localhost:${PORT}`);

  // logs incoming requests with method and route
  app.use((req, _res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
  });

  app.enableCors({
    credentials: true,
    origin: String(process.env.CORS_ORIGINS)
      ?.split(",")
      .map((origin) => origin.trim()),
  });

  /**
   * Serve static files from public folder.
   */
  app.use(express.static(path.join("public")));

  /**
   * Enable Swagger if specified in env.
   */
  if (process.env.ENABLE_SWAGGER === "true") {
    logger.info("Enabling Swagger");

    const description = fs.readFileSync(
      path.join("./", "src", "docs", "api-info.md"),
      "utf-8",
    );

    const config = new DocumentBuilder()
      .setTitle(
        `API Docs | ${APP_CONFIG.name} | ${APP_CONFIG.version} | @${APP_CONFIG.releaseChannel}`,
      )
      .setDescription(description)
      .setVersion(APP_CONFIG.version)
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [],
    });

    const swaggerPath = "/api/docs/";
    const swaggerAuthPath = "/api/auth/docs/";

    app.use(
      swaggerPath,
      apiReference({
        content: document,
        theme: "kepler",
      }),
    );

    const openAPISchema = await auth.api.generateOpenAPISchema();

    app.use(
      swaggerAuthPath,
      apiReference({
        content: openAPISchema,
        theme: "kepler",
      }),
    );
  } else {
    logger.log("Skipping swagger docs initialization!");
  }

  /**
   * Global validation pipe for DTOs.
   */
  app.useGlobalPipes(new AppValidationPipe());

  /**
   * Global response interceptor to format responses as `application/json`.
   */
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(Number(PORT));
}

void bootstrap();
