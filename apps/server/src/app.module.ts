import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModuleGlobal } from './lib/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MikroOrmModule.forRoot(),

    LoggerModuleGlobal,

    /**    AuthModule.forRoot({
      auth,
      // Fix for Express 5: The /*path pattern sets req.url=/ and req.baseUrl=full_path
      // better-call concatenates baseUrl+url creating a trailing slash that causes 404
      // This middleware restores req.url to the full path before the handler runs
      middleware: (req: any, _res: any, next: any) => {
        req.url = req.originalUrl;
        req.baseUrl = '';
        next();
      },
    }),

   **/

    QuizzesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
