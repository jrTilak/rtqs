import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/common/dto/response/api-response.dto';
import { Roles } from '@thallesp/nestjs-better-auth';
import { ROLES } from '@/lib/auth';

@Roles([ROLES.ADMIN])
@Controller('quizzes')
@ApiTags('Quizzes')
export class QuizzesController {
  constructor(private readonly _quizzesService: QuizzesService) {}

  @ApiOperation({
    summary: 'Create Quiz',
  })
  @Post('/')
  @ApiPostSuccess({
    type: QuizDto,
  })
  async create(@Body() body: CreateQuizDto): Promise<ApiResponse<QuizDto>> {
    const res = await this._quizzesService.create(body);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'List quizzes',
  })
  @Get('/')
  @ApiGetSuccess({
    type: QuizDto,
    isArray: true,
  })
  async listAll(): Promise<ApiResponse<QuizDto[]>> {
    const res = await this._quizzesService.listAll();
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Get quiz by id',
  })
  @Get('/quiz_id')
  @ApiGetSuccess({
    type: QuizDto,
  })
  async findById(
    @Param('quiz_id') quizId: string,
  ): Promise<ApiResponse<QuizDto>> {
    const res = await this._quizzesService.findById(quizId);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Update quiz by given id',
  })
  @Patch('/')
  @ApiPatchSuccess({
    type: QuizDto,
  })
  async update(@Body() body: UpdateQuizDto): Promise<ApiResponse<QuizDto>> {
    const res = await this._quizzesService.update(body);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Delete quizzes',
  })
  @Delete('/')
  @ApiDeleteSuccess()
  async deleteMany(
    @Query() query: DeleteQuizzesDto,
  ): Promise<ApiResponse<string[]>> {
    const res = await this._quizzesService.deleteMany(query);
    return new ApiResponse(res);
  }
}
