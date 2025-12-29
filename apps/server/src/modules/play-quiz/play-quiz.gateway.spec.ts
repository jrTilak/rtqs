import { Test, TestingModule } from '@nestjs/testing';
import { PlayQuizGateway } from './play-quiz.gateway';
import { PlayQuizService } from './play-quiz.service';

describe('PlayQuizGateway', () => {
  let gateway: PlayQuizGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayQuizGateway, PlayQuizService],
    }).compile();

    gateway = module.get<PlayQuizGateway>(PlayQuizGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
