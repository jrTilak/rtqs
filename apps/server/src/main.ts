import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";

import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./common/interceptor/response.interceptor";
import * as path from "path";
import { apiReference } from "@scalar/nestjs-api-reference";
import * as fs from "fs";
import "dotenv/config";
import { validateEnv } from "./common/validations/env.validation";
import { AppValidationPipe } from "./common/pipe/app-validation.pipe";
import { Logger } from "./lib/logger";
import { APP_CONFIG } from "./config/app.config";

const GLOBAL_PREFIX = "/api/";

validateEnv();

const logger = new Logger("Bootstrap");

logger.warn(`Warning: NODE_ENV is set to ${process.env.NODE_ENV}`);

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = (
    await NestFactory.create(AppModule, {
      bodyParser: false,
    })
  ).setGlobalPrefix(GLOBAL_PREFIX);
  logger.info(`Starting server... on port ${PORT} http://localhost:${PORT}`);

  // logs incoming requests with method and route
  app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
  });

  // const rawBodyRoutes = ["/webhooks/clerk/"];

  // rawBodyRoutes.map((route) => {
  //   app.use(
  //     GLOBAL_PREFIX + route,
  //     bodyParser.raw({ type: "application/json" }),
  //     (req, res, next) => {
  //       logger.info(`Disabling body parsing for ${req.originalUrl}`);
  //       next();
  //     }
  //   );
  // });

  /**
   * Enable CORS as * in development mode for testing.
   */
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
  if (process.env.ENABLE_SWAGGER == "true") {
    logger.info("Enabling Swagger");
    const config = new DocumentBuilder()
      .setTitle(
        `API Docs | ${APP_CONFIG.NAME} | ${APP_CONFIG.CURRENT_VERSION} | @${APP_CONFIG.STATUS}`
      )
      .setVersion(APP_CONFIG.CURRENT_VERSION)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const swaggerPath = process.env.SWAGGER_PATH ?? "/docs";

    // create public folder if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, "..", "public"))) {
      fs.mkdirSync(path.join(__dirname, "..", "public"));
    }

    // save the document to a file
    fs.writeFileSync(
      path.join(__dirname, "..", "public", "swagger.json"),
      JSON.stringify(document)
    );

    app.use(
      swaggerPath,
      apiReference({
        content: document,
      })
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
