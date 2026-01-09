import { BaseEntity } from '@/common/db/entities/base-entity';
import { QuizModuleEntity } from '@/modules/quiz-modules/entities';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { QuizQuestionsRepository } from '../quiz-questions.repository';

@Entity({ repository: () => QuizQuestionsRepository })
export class QuizQuestionEntity extends BaseEntity {
  [EntityRepositoryType]?: QuizQuestionsRepository;

  @Property()
  question: string;

  @Property()
  answer: string;

  @Property()
  index: number;

  @ManyToOne({ deleteRule: 'cascade' })
  module: QuizModuleEntity;
}

export type QuizQuestionEntityType = InstanceType<typeof QuizQuestionEntity>;
