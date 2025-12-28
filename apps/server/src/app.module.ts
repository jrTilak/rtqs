import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { LoggerModuleGlobal } from './lib/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { QuizModulesModule } from './modules/quiz-modules/quiz-modules.module';
import { QuizQuestionsModule } from './modules/quiz-questions/quiz-questions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModuleGlobal,

    UsersModule,

    AuthModule.forRoot({
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

    QuizzesModule,

    QuizModulesModule,

    QuizQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
