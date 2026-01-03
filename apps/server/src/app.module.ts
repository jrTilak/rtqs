import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModuleGlobal } from './lib/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { MikroORM } from '@mikro-orm/core';
import { createAuth } from './lib/auth';
import { QuizModulesModule } from './modules/quiz-modules/quiz-modules.module';
import { QuizQuestionsModule } from './modules/quiz-questions/quiz-questions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MikroOrmModule.forRoot(),

    AuthModule.forRootAsync({
      inject: [MikroORM],
      useFactory: (orm: MikroORM) => {
        const auth = createAuth(orm);

        return {
          auth,
          middleware: (req: any, _res: any, next: any) => {
            // fix for Express 5 trailing slash issue
            req.url = req.originalUrl;
            req.baseUrl = '';
            next();
          },
        };
      },
    }),

    LoggerModuleGlobal,

    QuizzesModule,

    QuizModulesModule,

    QuizQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
