import { BaseEntity } from '@/common/db/entities/base-entity';
import { QuizEntity } from '@/modules/quizzes/entities';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { QuizParticipantsRepository } from '../quiz-participants.repository';

@Entity({ repository: () => QuizParticipantsRepository })
export class QuizParticipantEntity extends BaseEntity {
  [EntityRepositoryType]?: QuizParticipantsRepository;

  @Property()
  email: string;

  @ManyToOne({ deleteRule: 'cascade' })
  quiz: QuizEntity;
}

export type QuizParticipantEntityType = InstanceType<
  typeof QuizParticipantEntity
>;
