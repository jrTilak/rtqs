import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "@/lib/auth";
import { dataSource } from "@/db";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerModuleGlobal } from "./lib/logger/logger.module";
@Module({
  imports: [
    LoggerModuleGlobal,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSource.options,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async () => {
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }
        return dataSource;
      },
    }),

    AuthModule.forRoot({
      auth,
      middleware: (req: any, _res: any, next: any) => {
        // fix for Express 5 trailing slash issue
        req.url = req.originalUrl;
        req.baseUrl = "";
        next();
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
