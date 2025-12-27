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
  ApiPostSuccess,
} from '@/common/decorators/response/api-response-success.decorator';
import { QuizDto } from './dto/response/quiz.dto';

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
  crateQuizModule(@Body() data: CreateQuizModuleDto) {
    return this._quizzesService.createQuizModule(data);
  }

  @ApiDocs({
    path: '/quizzes/list-quiz-modules.md',
  })
  @Get('/modules')
  @Roles(['admin'])
  listQuizModules() {
    return this._quizzesService.listQuizModules();
  }

  @ApiDocs({
    path: '/quizzes/update-quiz-module.md',
  })
  @Patch('/modules')
  @Roles(['admin'])
  updateQuizModule(@Body() data: UpdateQuizModuleDto) {
    return this._quizzesService.updateQuizModule(data);
  }

  @ApiDocs({
    path: '/quizzes/delete-quiz-modules.md',
  })
  @Delete('/modules')
  @Roles(['admin'])
  deleteQuizModules(@Query() query: DeleteQuizModulesDto) {
    return this._quizzesService.deleteQuizModules(query);
  }
}
