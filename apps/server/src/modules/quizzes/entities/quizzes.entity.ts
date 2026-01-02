import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { QuizzesRepository } from '../quizzes.repository';
import { BaseEntity } from '@/common/entities/base-entity';

@Entity({ repository: () => QuizzesRepository })
export class QuizEntity extends BaseEntity {
  [EntityRepositoryType]?: QuizzesRepository;

  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;
}
export type QuizEntityType = InstanceType<typeof QuizEntity>;
