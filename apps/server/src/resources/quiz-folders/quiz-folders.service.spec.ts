import { Test, TestingModule } from '@nestjs/testing';
import { QuizFoldersService } from './quiz-folders.service';

describe('QuizFoldersService', () => {
  let service: QuizFoldersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizFoldersService],
    }).compile();

    service = module.get<QuizFoldersService>(QuizFoldersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
