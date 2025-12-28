import { Test, TestingModule } from '@nestjs/testing';
import { QuizModulesService } from './quiz-modules.service';

describe('QuizModulesService', () => {
  let service: QuizModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizModulesService],
    }).compile();

    service = module.get<QuizModulesService>(QuizModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
