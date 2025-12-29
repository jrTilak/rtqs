import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuizQuestionsService } from './quiz-questions.service';
import { ApiDocs } from '@/common/decorators/api-docs.decorators';
import {
  ApiDeleteSuccess,
  ApiGetSuccess,
  ApiPatchSuccess,
  ApiPostSuccess,
} from '@/common/decorators/response/api-response-success.decorator';
import { QuizQuestionDto } from './dto/response/quiz-question.dto';
import {
  AddQuizQuestionsDto,
  DeleteQuizQuestionsDto,
  ListQuizQuestionsDto,
  UpdateQuizQuestionDto,
} from './dto/requests/quiz-questions.dto';
import { Roles } from '@thallesp/nestjs-better-auth';
import { ApiTags } from '@nestjs/swagger';

@Controller('quiz/questions')
@ApiTags('Quiz Questions')
@Roles(['admin'])
export class QuizQuestionsController {
  constructor(private readonly _quizQuestionsService: QuizQuestionsService) {}

  @ApiDocs({
    path: '/quiz-questions/add-quiz-questions.md',
  })
  @Post('/')
  @ApiPostSuccess({
    type: QuizQuestionDto,
    isArray: true,
  })
  addQuizQuestions(@Body() body: AddQuizQuestionsDto) {
    return this._quizQuestionsService.addQuizQuestions(body);
  }

  @ApiDocs({
    path: '/quiz-questions/list-quiz-questions.md',
  })
  @Get('/')
  @ApiGetSuccess({
    type: QuizQuestionDto,
    isArray: true,
  })
  listQuizQuestions(@Query() query: ListQuizQuestionsDto) {
    return this._quizQuestionsService.listQuizQuestions(query);
  }

  @ApiDocs({
    path: '/quiz-questions/update-quiz-question.md',
  })
  @Patch('/')
  @ApiPatchSuccess({
    type: QuizQuestionDto,
  })
  updateQuizQuestion(@Body() body: UpdateQuizQuestionDto) {
    return this._quizQuestionsService.updateQuizQuestion(body);
  }

  @ApiDocs({
    path: '/quiz-questions/delete-quiz-questions.md',
  })
  @Delete('/')
  @ApiDeleteSuccess()
  deleteQuizQuestions(@Query() query: DeleteQuizQuestionsDto) {
    return this._quizQuestionsService.deleteQuizQuestions(query);
  }
}
