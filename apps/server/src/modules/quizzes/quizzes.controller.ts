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
import { QuizzesService } from './quizzes.service';
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ROLES } from '@/lib/auth';

@Controller('quizzes')
@Roles([ROLES.ADMIN])
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
  create(@Body() body: CreateQuizDto) {
    return this._quizzesService.create(body);
  }

  @ApiOperation({
    summary: 'List All Quizzes',
  })
  @Get('/')
  @ApiGetSuccess({
    type: QuizDto,
    isArray: true,
  })
  list() {
    return this._quizzesService.list();
  }

  @ApiOperation({
    summary: 'Get quiz by id',
  })
  @Get('/:quiz_id')
  @ApiGetSuccess({
    type: QuizDto,
  })
  getById(@Param('quiz_id', new ParseUUIDPipe()) quizId: string) {
    return this._quizzesService.getById(quizId);
  }

  @ApiOperation({
    summary: 'Update quiz',
  })
  @Patch('/')
  @ApiPatchSuccess({
    type: QuizDto,
  })
  update(@Body() body: UpdateQuizDto) {
    return this._quizzesService.update(body);
  }

  @ApiOperation({
    summary: 'Delete quizzes',
  })
  @Delete('/')
  @ApiDeleteSuccess()
  delete(@Query() query: DeleteQuizzesDto) {
    return this._quizzesService.delete(query);
  }
}
