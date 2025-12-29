import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuizModulesService } from './quiz-modules.service';
import { ApiDocs } from '@/common/decorators/api-docs.decorators';
import { Roles } from '@thallesp/nestjs-better-auth';
import {
  ApiDeleteSuccess,
  ApiGetSuccess,
  ApiPatchSuccess,
  ApiPostSuccess,
} from '@/common/decorators/response/api-response-success.decorator';
import { QuizModuleDto } from './dto/response/quiz-module.dto';
import {
  CreateQuizModuleDto,
  DeleteQuizModulesDto,
  ListQuizModulesDto,
  UpdateQuizModuleDto,
} from './dto/requests/quiz-module.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('quiz/modules')
@ApiTags('Quiz Modules')
@Roles(['admin'])
export class QuizModulesController {
  constructor(private readonly _quizModulesService: QuizModulesService) {}

  @ApiDocs({
    path: '/quiz-modules/create-quiz-module.md',
  })
  @Post('/')
  @ApiPostSuccess({
    type: QuizModuleDto,
  })
  createQuizModule(@Body() data: CreateQuizModuleDto) {
    return this._quizModulesService.createQuizModule(data);
  }

  @ApiDocs({
    path: '/quiz-modules/list-quiz-modules.md',
  })
  @Get('/')
  @ApiGetSuccess({
    type: QuizModuleDto,
    isArray: true,
  })
  listQuizModules(@Query() query: ListQuizModulesDto) {
    return this._quizModulesService.listQuizModules(query);
  }

  @ApiDocs({
    path: '/quiz-modules/update-quiz-module.md',
  })
  @Patch('/')
  @ApiPatchSuccess({
    type: QuizModuleDto,
  })
  updateQuizModule(@Body() data: UpdateQuizModuleDto) {
    return this._quizModulesService.updateQuizModule(data);
  }

  @ApiDocs({
    path: '/quiz-modules/delete-quiz-modules.md',
  })
  @Delete('/')
  @ApiDeleteSuccess()
  deleteQuizModules(@Query() query: DeleteQuizModulesDto) {
    return this._quizModulesService.deleteQuizModules(query);
  }
}
