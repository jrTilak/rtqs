import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class QuizParticipantBaseDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the participant',
    type: 'string',
    example: 'john@example.com',
    required: true,
  })
  email: string;
}
