import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetLobbyDto, ListLobbiesDto, LobbyDto } from './dto';
import { Roles } from '@thallesp/nestjs-better-auth';
import { PlayQuizService } from './play-quiz.service';
import { ApiDocs } from '@/common/decorators/api-docs.decorators';
import { ApiGetSuccess } from '@/common/decorators/response/api-response-success.decorator';

@Controller('play-quiz')
@ApiTags('Play Quiz')
export class PlayQuizController {
  constructor(private readonly _playQuizService: PlayQuizService) {}

  @Get('/lobbies')
  @Roles(['admin'])
  @ApiDocs({
    path: '/play-quiz/list-lobbies.md',
  })
  @ApiGetSuccess({
    type: LobbyDto,
    isArray: true,
  })
  listLobbies(@Query() query: ListLobbiesDto) {
    return this._playQuizService.listLobbies(query);
  }

  @ApiGetSuccess({
    type: LobbyDto,
  })
  @Roles(['admin'])
  @Get('/lobby')
  getLobby(@Query() query: GetLobbyDto) {
    return this._playQuizService.getLobby(query);
  }
}
