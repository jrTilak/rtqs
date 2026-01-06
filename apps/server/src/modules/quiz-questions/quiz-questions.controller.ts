import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuizQuestionsService } from './quiz-questions.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@thallesp/nestjs-better-auth';
import { ROLES } from '@/lib/auth';
import {
  ApiDeleteSuccess,
  ApiGetSuccess,
  ApiPatchSuccess,
  ApiPostSuccess,
} from '@/common/decorators/response/api-response-success.decorator';
import { QuizQuestionDto } from './dto/response/quiz-question.dto';
import {
  CreateQuizQuestionDto,
  DeleteQuizQuestionsDto,
  ListQuizQuestionsDto,
  UpdateQuizQuestionDto,
} from './dto/requests/quiz-question.dto';
import { ApiResponse } from '@/common/dto/response/api-response.dto';

@Controller('quiz/questions')
@ApiTags('Quiz Questions')
@Roles([ROLES.ADMIN])
export class QuizQuestionsController {
  constructor(private readonly _quizQuestionsService: QuizQuestionsService) {}

  @ApiOperation({
    summary: 'Create Quiz Question',
  })
  @Post('/')
  @ApiPostSuccess({
    type: QuizQuestionDto,
    isArray: true,
  })
  async create(
    @Body() body: CreateQuizQuestionDto,
  ): Promise<ApiResponse<QuizQuestionDto[]>> {
    const res = await this._quizQuestionsService.create(body);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'List questions',
  })
  @Get('/')
  @ApiGetSuccess({
    type: QuizQuestionDto,
    isArray: true,
  })
  async list(
    @Query() query: ListQuizQuestionsDto,
  ): Promise<ApiResponse<QuizQuestionDto[]>> {
    const res = await this._quizQuestionsService.list(query);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Get question by id',
  })
  @Get('/:question_id')
  @ApiGetSuccess({
    type: QuizQuestionDto,
  })
  async findById(
    @Param('question_id', new ParseUUIDPipe()) questionId: string,
  ): Promise<ApiResponse<QuizQuestionDto>> {
    const res = await this._quizQuestionsService.findById(questionId);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Update question by given id',
  })
  @Patch('/')
  @ApiPatchSuccess({
    type: QuizQuestionDto,
  })
  async update(
    @Body() body: UpdateQuizQuestionDto,
  ): Promise<ApiResponse<QuizQuestionDto>> {
    const res = await this._quizQuestionsService.update(body);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Delete quiz modules',
  })
  @Delete('/')
  @ApiDeleteSuccess()
  async deleteMany(
    @Query() query: DeleteQuizQuestionsDto,
  ): Promise<ApiResponse<string[]>> {
    const res = await this._quizQuestionsService.deleteMany(query);
    return new ApiResponse(res);
  }
}
