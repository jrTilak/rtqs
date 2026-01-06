import { BaseEntity } from '@/common/db/entities/base-entity';
import { QuizEntity } from '@/modules/quizzes/entities';
import {
  Entity,
  EntityRepositoryType,
  Enum,
  Index,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { QuizLobbyRepository } from '../play-quiz.repository';

export enum QuizLobbyStatsEnum {
  IN_LOBBY = 'IN_LOBBY',
  ENDED = 'ENDED',
}

@Entity({
  repository: () => QuizLobbyRepository,
})
export class QuizLobbyEntity extends BaseEntity {
  [EntityRepositoryType]?: QuizLobbyRepository;

  @Property()
  @Index()
  code: string;

  @Property()
  name: string;

  @Property({ default: 0 })
  participantsCount: number = 0;

  @Property()
  waitInLobbyUntil: Date;

  @Enum({ default: QuizLobbyStatsEnum.IN_LOBBY })
  status: QuizLobbyStatsEnum = QuizLobbyStatsEnum.IN_LOBBY;

  @ManyToOne({ deleteRule: 'cascade' })
  quiz: QuizEntity;
}

export type QuizLobbyEntityType = InstanceType<typeof QuizLobbyEntity>;
