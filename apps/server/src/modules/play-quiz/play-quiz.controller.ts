import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PlayQuizService } from './play-quiz.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles, Session } from '@thallesp/nestjs-better-auth';
import { ROLES } from '@/lib/auth';
import {
  CreateLobbyDto,
  DeleteLobbyDto,
  ListLobbyDto,
} from './dto/request/lobby.dto';
import { ApiResponse } from '@/common/dto/response/api-response.dto';
import {
  ApiDeleteSuccess,
  ApiGetSuccess,
} from '@/common/decorators/response/api-response-success.decorator';
import { QuizLobbyDto } from './dto/response/lobby.dto';
import { User } from '@/common/db/entities/auth.entity';

@Controller('quiz/play')
@ApiTags('Play Quiz')
@Roles([ROLES.ADMIN])
export class PlayQuizController {
  constructor(private readonly _playQuizService: PlayQuizService) {}

  @Post('/lobby')
  @ApiOperation({
    summary: 'Create a lobby',
  })
  @ApiGetSuccess({
    type: QuizLobbyDto,
  })
  async createLobby(@Body() body: CreateLobbyDto) {
    const res = await this._playQuizService.createLobby(body);
    return new ApiResponse(res);
  }

  @Get('/lobby')
  @ApiOperation({
    summary: 'List lobbies',
  })
  @ApiGetSuccess({
    type: QuizLobbyDto,
    isArray: true,
  })
  async listLobbies(@Query() query: ListLobbyDto) {
    const res = await this._playQuizService.listLobbies(query);
    return new ApiResponse(res);
  }

  @Roles([ROLES.USER])
  @Get('/lobby/code/:code')
  @ApiOperation({
    summary: 'Join a lobby by lobby code',
  })
  @ApiGetSuccess({
    type: QuizLobbyDto,
  })
  async joinLobby(
    @Param('code') code: string,
    @Session() session: { user: User },
  ) {
    const res = await this._playQuizService.joinLobby(code, session.user);
    return new ApiResponse(res);
  }

  @Get('/lobby/:lobby_id')
  @ApiOperation({
    summary: 'Get lobby by id',
  })
  @ApiGetSuccess({
    type: QuizLobbyDto,
  })
  async findLobbyById(@Param('lobby_id', new ParseUUIDPipe()) id: string) {
    const res = await this._playQuizService.findLobbyById(id);
    return new ApiResponse(res);
  }

  @Delete('/lobby')
  @ApiOperation({
    summary: 'Delete lobbies by ids',
  })
  @ApiDeleteSuccess()
  async deleteLobbies(@Query() query: DeleteLobbyDto) {
    const res = await this._playQuizService.deleteLobby(query);
    return new ApiResponse(res);
  }
}
