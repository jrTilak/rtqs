import { BaseEntity } from '@/common/db/entities/base-entity';
import { QuizEntity } from '@/modules/quizzes/entities';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { QuizModulesRepository } from '../quiz-modules.repository';

@Entity({ repository: () => QuizModulesRepository })
export class QuizModuleEntity extends BaseEntity {
  [EntityRepositoryType]?: QuizModulesRepository;
  @Property()
  name: string;

  @Property()
  index: number;

  @ManyToOne()
  quiz!: QuizEntity;
}

export type QuizModuleEntityType = InstanceType<typeof QuizModuleEntity>;
