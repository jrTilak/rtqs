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
import { ApiDocs } from '@/common/decorators/api-docs.decorators';
import { Roles } from '@thallesp/nestjs-better-auth';
import {
  ApiDeleteSuccess,
  ApiGetSuccess,
  ApiPatchSuccess,
  ApiPostSuccess,
} from '@/common/decorators/response/api-response-success.decorator';
import { QuizDto } from './dto/response/quiz.dto';
import {
  CreateQuizDto,
  DeleteQuizzesDto,
  UpdateQuizDto,
} from './dto/requests/quiz.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('quizzes')
@Roles(['admin'])
@ApiTags('Quizzes')
export class QuizzesController {
  constructor(private readonly _quizzesService: QuizzesService) {}

  @ApiDocs({
    path: '/quizzes/create-quiz.md',
  })
  @Post('/')
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
  @ApiDeleteSuccess()
  deleteQuizzes(@Query() query: DeleteQuizzesDto) {
    return this._quizzesService.deleteQuizzes(query);
  }
}
