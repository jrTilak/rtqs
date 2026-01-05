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
import { QuizModulesService } from './quiz-modules.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { ApiResponse } from '@/common/dto/response/api-response.dto';
import { Roles } from '@thallesp/nestjs-better-auth';
import { ROLES } from '@/lib/auth';

@Controller('quiz/modules')
@ApiTags('Quiz Modules')
@Roles([ROLES.ADMIN])
export class QuizModulesController {
  constructor(private readonly _quizModulesService: QuizModulesService) {}
  @ApiOperation({
    summary: 'Create Quiz Module',
  })
  @Post('/')
  @ApiPostSuccess({
    type: QuizModuleDto,
  })
  async create(
    @Body() body: CreateQuizModuleDto,
  ): Promise<ApiResponse<QuizModuleDto>> {
    const res = await this._quizModulesService.create(body);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'List quiz modules',
  })
  @Get('/')
  @ApiGetSuccess({
    type: QuizModuleDto,
    isArray: true,
  })
  async list(
    @Query() query: ListQuizModulesDto,
  ): Promise<ApiResponse<QuizModuleDto[]>> {
    const res = await this._quizModulesService.list(query);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Get quiz module by id',
  })
  @Get('/:module_id')
  @ApiGetSuccess({
    type: QuizModuleDto,
  })
  async findById(
    @Param('module_id', new ParseUUIDPipe()) moduleId: string,
  ): Promise<ApiResponse<QuizModuleDto>> {
    const res = await this._quizModulesService.findById(moduleId);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Update quiz module by given id',
  })
  @Patch('/')
  @ApiPatchSuccess({
    type: QuizModuleDto,
  })
  async update(
    @Body() body: UpdateQuizModuleDto,
  ): Promise<ApiResponse<QuizModuleDto>> {
    const res = await this._quizModulesService.update(body);
    return new ApiResponse(res);
  }

  @ApiOperation({
    summary: 'Delete quiz modules',
  })
  @Delete('/')
  @ApiDeleteSuccess()
  async deleteMany(
    @Query() query: DeleteQuizModulesDto,
  ): Promise<ApiResponse<string[]>> {
    const res = await this._quizModulesService.deleteMany(query);
    return new ApiResponse(res);
  }
}
