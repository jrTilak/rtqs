import { Test, TestingModule } from '@nestjs/testing';
import { PlayQuizController } from './play-quiz.controller';
import { PlayQuizService } from './play-quiz.service';

describe('PlayQuizController', () => {
  let controller: PlayQuizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayQuizController],
      providers: [PlayQuizService],
    }).compile();

    controller = module.get<PlayQuizController>(PlayQuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
