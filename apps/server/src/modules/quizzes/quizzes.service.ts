import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateQuizDto,
  DeleteQuizzesDto,
  UpdateQuizDto,
} from './dto/requests/quiz.dto';
import { QuizTable } from './entity';
import { QuizzesRepository } from './quizzes.repository';

@Injectable()
export class QuizzesService {
  constructor(private readonly _quizzesRepository: QuizzesRepository) {}

  async create(data: CreateQuizDto): Promise<QuizTable> {
    return this._quizzesRepository.insert(data);
  }

  async list(): Promise<QuizTable[]> {
    return this._quizzesRepository.findAll();
  }

  async getById(quizId: string): Promise<QuizTable> {
    const quiz = await this._quizzesRepository.findOneById(quizId);

    if (!quiz) {
      throw new NotFoundException('No Quiz found with provided id.');
    }

    return quiz;
  }

  async update({ ...data }: UpdateQuizDto): Promise<QuizTable> {
    if (await this._quizzesRepository.exists(data.id)) {
      throw new NotFoundException('No Quiz found with provided id.');
    }

    return this._quizzesRepository.updateOneById(data);
  }

  async delete({ ids }: DeleteQuizzesDto): Promise<string[]> {
    const existing = await this._quizzesRepository.getExistingIds(ids);

    if (existing.length === 0) {
      throw new NotFoundException('No quizzes found with provided ids.');
    }

    await this._quizzesRepository.deleteMany(ids);
    return existing;
  }
}
