import { Test, TestingModule } from '@nestjs/testing';
import { QuizParticipantsController } from './quiz-participants.controller';
import { QuizParticipantsService } from './quiz-participants.service';

describe('QuizParticipantsController', () => {
  let controller: QuizParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizParticipantsController],
      providers: [QuizParticipantsService],
    }).compile();

    controller = module.get<QuizParticipantsController>(
      QuizParticipantsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
