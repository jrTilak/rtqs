import { Test, TestingModule } from '@nestjs/testing';
import { QuizModulesController } from './quiz-modules.controller';
import { QuizModulesService } from './quiz-modules.service';

describe('QuizModulesController', () => {
  let controller: QuizModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizModulesController],
      providers: [QuizModulesService],
    }).compile();

    controller = module.get<QuizModulesController>(QuizModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
