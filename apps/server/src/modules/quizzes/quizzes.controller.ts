import { Body, Controller, Post } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { ApiPostSuccess } from '@/common/decorators/response/api-response-success.decorator';
import { QuizDto } from './dto/response/quiz.dto';
import { CreateQuizDto } from './dto/requests/quiz.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  create(@Body() body: CreateQuizDto) {
    return this._quizzesService.create(body);
  }
}
