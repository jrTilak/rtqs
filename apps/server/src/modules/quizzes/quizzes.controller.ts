import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/requests/create-quiz.dto';
import { UpdateQuizDto } from './dto/requests/update-quiz.dto';
import { DeleteQuizzesDto } from './dto/requests/delete-quizzes.dto';
import { ApiDocs } from '@/common/decorators/api-docs.decorators';
import { Roles } from '@thallesp/nestjs-better-auth';
import { CreateQuizModuleDto } from './dto/requests/create-quiz-module.dto';
import { UpdateQuizModuleDto } from './dto/requests/update-quiz-module.dto';
import { DeleteQuizModulesDto } from './dto/requests/delete-quiz-module.dto';
import {
  ApiDeleteSuccess,
  ApiGetSuccess,
  ApiPatchSuccess,
  ApiPostSuccess,
} from '@/common/decorators/response/api-response-success.decorator';
import { QuizDto } from './dto/response/quiz.dto';
import { QuizModuleDto } from './dto/response/quiz-module.dto';
import { ListQuizModulesDto } from './dto/requests/list-quiz-modules.dto';
import { AddQuestionsDto } from './dto/requests/add-questions.dto';
import { QuizQuestion } from './dto/response/quiz-question.dto';
import { ListQuizQuestionsDto } from './dto/requests/list-quiz-questions.dto';
import { UpdateQuestionDto } from './dto/requests/update-question.dto';
import { DeleteQuizQuestionsDto } from './dto/requests/delete-quiz-questions.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly _quizzesService: QuizzesService) {}

  @ApiDocs({
    path: '/quizzes/create-quiz.md',
  })
  @Post('/')
  @Roles(['admin'])
  @ApiPostSuccess({
    type: QuizDto,
  })
  createQuiz(@Body() body: CreateQuizDto) {
    return this._quizzesService.createQuiz(body);
  }

  @ApiDocs({
    path: '/quizzes/list-quizzes.md',
  })
  @Get('/')
  @ApiGetSuccess({
    type: QuizDto,
    isArray: true,
  })
  listAllQuizzes() {
    return this._quizzesService.listQuizzes();
  }

  @ApiDocs({
    path: '/quizzes/update-quiz.md',
  })
  @Patch('/')
  @Roles(['admin'])
  @ApiPatchSuccess({
    type: QuizDto,
  })
  updateQuiz(@Body() body: UpdateQuizDto) {
    return this._quizzesService.updateQuiz(body);
  }

  @ApiDocs({
    path: '/quizzes/delete-quizzes.md',
  })
  @Delete('/')
  @Roles(['admin'])
  @ApiDeleteSuccess()
  deleteQuizzes(@Query() query: DeleteQuizzesDto) {
    return this._quizzesService.deleteQuizzes(query);
  }

  // quiz modules
  @ApiDocs({
    path: '/quizzes/create-quiz-module.md',
  })
  @Post('/modules')
  @Roles(['admin'])
  @ApiPostSuccess({
    type: QuizModuleDto,
  })
  createQuizModule(@Body() data: CreateQuizModuleDto) {
    return this._quizzesService.createQuizModule(data);
  }

  @ApiDocs({
    path: '/quizzes/list-quiz-modules.md',
  })
  @Get('/modules')
  @Roles(['admin'])
  @ApiGetSuccess({
    type: QuizModuleDto,
    isArray: true,
  })
  listQuizModules(@Query() query: ListQuizModulesDto) {
    return this._quizzesService.listQuizModules(query);
  }

  @ApiDocs({
    path: '/quizzes/update-quiz-module.md',
  })
  @Patch('/modules')
  @Roles(['admin'])
  @ApiPatchSuccess({
    type: QuizModuleDto,
  })
  updateQuizModule(@Body() data: UpdateQuizModuleDto) {
    return this._quizzesService.updateQuizModule(data);
  }

  @ApiDocs({
    path: '/quizzes/delete-quiz-modules.md',
  })
  @Delete('/modules')
  @Roles(['admin'])
  @ApiDeleteSuccess()
  deleteQuizModules(@Query() query: DeleteQuizModulesDto) {
    return this._quizzesService.deleteQuizModules(query);
  }

  // quiz questions
  @ApiDocs({
    path: '/quizzes/add-quiz-questions.md',
  })
  @Post('/questions')
  @Roles(['admin'])
  @ApiPostSuccess({
    type: QuizQuestion,
    isArray: true,
  })
  addQuestions(@Body() body: AddQuestionsDto) {
    return this._quizzesService.addQuestions(body);
  }

  @ApiDocs({
    path: '/quizzes/list-quiz-questions.md',
  })
  @Get('/questions')
  @Roles(['admin'])
  @ApiGetSuccess({
    type: QuizQuestion,
    isArray: true,
  })
  listQuestions(@Query() query: ListQuizQuestionsDto) {
    return this._quizzesService.listQuestions(query);
  }

  @ApiDocs({
    path: '/quizzes/update-quiz-question.md',
  })
  @Patch('/questions')
  @Roles(['admin'])
  @ApiPatchSuccess({
    type: QuizQuestion,
  })
  updateQuestion(@Body() body: UpdateQuestionDto) {
    return this._quizzesService.updateQuestion(body);
  }

  @ApiDocs({
    path: '/quizzes/delete-quiz-questions.md',
  })
  @Delete('/questions')
  @Roles(['admin'])
  @ApiDeleteSuccess()
  deleteQuestions(@Query() query: DeleteQuizQuestionsDto) {
    return this._quizzesService.deleteQuizQuestions(query);
  }
}
