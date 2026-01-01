import { Test, TestingModule } from '@nestjs/testing';
import { PlayQuizController } from './play-quiz.controller';

describe('PlayQuizController', () => {
  let controller: PlayQuizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayQuizController],
    }).compile();

    controller = module.get<PlayQuizController>(PlayQuizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
