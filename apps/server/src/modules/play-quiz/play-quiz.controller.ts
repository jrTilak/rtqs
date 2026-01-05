import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PlayQuizService } from './play-quiz.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@thallesp/nestjs-better-auth';
import { ROLES } from '@/lib/auth';
import { CreateLobbyDto, ListLobbyDto } from './dto/request/lobby.dto';
import { ApiResponse } from '@/common/dto/response/api-response.dto';

@Controller('quiz/play')
@ApiTags('Play Quiz')
@Roles([ROLES.ADMIN])
export class PlayQuizController {
  constructor(private readonly _playQuizService: PlayQuizService) {}

  @Post('/lobby')
  @ApiOperation({
    summary: 'Create a lobby',
  })
  async createLobby(@Body() body: CreateLobbyDto) {
    const res = await this._playQuizService.createLobby(body);
    return new ApiResponse(res);
  }

  @Get('/lobby')
  @ApiOperation({
    summary: 'List lobbies',
  })
  async listLobbies(@Query() query: ListLobbyDto) {
    const res = await this._playQuizService.listLobbies(query);
    return new ApiResponse(res);
  }

  @Get('/lobby/code/:code')
  @ApiOperation({
    summary: 'Get lobby by lobby code',
  })
  async findLobbyByCode(@Param('code') code: string) {
    const res = await this._playQuizService.findLobbyByCode(code);
    return new ApiResponse(res);
  }

  @Get('/lobby/:lobby_id')
  @ApiOperation({
    summary: 'Get lobby by id',
  })
  async findLobbyById(@Param('lobby_id', new ParseUUIDPipe()) id: string) {
    const res = await this._playQuizService.findLobbyById(id);
    return new ApiResponse(res);
  }
}
