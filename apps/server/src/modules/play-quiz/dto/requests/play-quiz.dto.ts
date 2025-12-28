import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinDate,
} from 'class-validator';

export class OnCreateLobbyDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  quizId: string;

  @IsString()
  @IsDateString()
  @MinDate(() => new Date())
  waitUntill: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
