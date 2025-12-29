import { Test, TestingModule } from '@nestjs/testing';
import { PlayQuizService } from './play-quiz.service';

describe('PlayQuizService', () => {
  let service: PlayQuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayQuizService],
    }).compile();

    service = module.get<PlayQuizService>(PlayQuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
