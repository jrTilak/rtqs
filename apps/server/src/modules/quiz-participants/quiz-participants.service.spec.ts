import { Test, TestingModule } from '@nestjs/testing';
import { QuizParticipantsService } from './quiz-participants.service';

describe('QuizParticipantsService', () => {
  let service: QuizParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizParticipantsService],
    }).compile();

    service = module.get<QuizParticipantsService>(QuizParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
