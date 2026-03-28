import { Test, TestingModule } from '@nestjs/testing';
import { QuizFoldersController } from './quiz-folders.controller';
import { QuizFoldersService } from './quiz-folders.service';

describe('QuizFoldersController', () => {
  let controller: QuizFoldersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizFoldersController],
      providers: [QuizFoldersService],
    }).compile();

    controller = module.get<QuizFoldersController>(QuizFoldersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
