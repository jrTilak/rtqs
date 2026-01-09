import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { QuizParticipantsService } from './quiz-participants.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@thallesp/nestjs-better-auth';
import { ROLES } from '@/lib/auth';
import {
  ApiDeleteSuccess,
  ApiGetSuccess,
  ApiPostSuccess,
} from '@/common/decorators/response/api-response-success.decorator';
import { QuizParticipantDto } from './dto/response/quiz-participant.dto';
import {
  CreateQuizParticipantsDto,
  DeleteQuizParticipantsDto,
  ListQuizParticipantsDto,
} from './dto/requests/quiz-participant.dto';
import { ApiResponse } from '@/common/dto/response/api-response.dto';

@Controller('quiz/participants')
@ApiTags('Quiz Participants')
@Roles([ROLES.ADMIN])
export class QuizParticipantsController {
  constructor(
    private readonly _quizParticipantsService: QuizParticipantsService,
  ) {}

  @ApiOperation({
    summary: 'Create Quiz Participants',
  })
  @Post('/')
  @ApiPostSuccess({
    type: QuizParticipantDto,
    isArray: true,
  })
  async create(
    @Body() body: CreateQuizParticipantsDto,
  ): Promise<ApiResponse<QuizParticipantDto[]>> {
    const res = await this._quizParticipantsService.create(body);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'List participants',
  })
  @Get('/')
  @ApiGetSuccess({
    type: QuizParticipantDto,
    isArray: true,
  })
  async list(
    @Query() query: ListQuizParticipantsDto,
  ): Promise<ApiResponse<QuizParticipantDto[]>> {
    const res = await this._quizParticipantsService.list(query);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Delete quiz participants',
  })
  @Delete('/')
  @ApiDeleteSuccess()
  async deleteMany(
    @Query() query: DeleteQuizParticipantsDto,
  ): Promise<ApiResponse<string[]>> {
    const res = await this._quizParticipantsService.deleteMany(query);
    return new ApiResponse(res);
  }
}
