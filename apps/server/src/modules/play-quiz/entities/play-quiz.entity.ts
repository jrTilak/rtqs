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
import {
  LobbyPlayerRepository,
  LobbyPlayerResponseRepository,
  QuizLobbyRepository,
} from '../play-quiz.repository';
import { User } from '@/common/db/entities/auth.entity';
import { QuizQuestionEntity } from '@/modules/quiz-questions/entities/quiz-question.entity';

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

@Entity({
  repository: () => LobbyPlayerRepository,
})
export class LobbyPlayerEntity extends BaseEntity {
  [EntityRepositoryType]?: LobbyPlayerRepository;

  @ManyToOne({ deleteRule: 'cascade' })
  lobby: QuizLobbyEntity;

  @ManyToOne({ deleteRule: 'cascade' })
  player: User;
}
export type LobbyPlayerEntityType = InstanceType<typeof LobbyPlayerEntity>;

@Entity({
  repository: () => LobbyPlayerResponseRepository,
})
export class LobbyPlayerResponseEntity extends BaseEntity {
  [EntityRepositoryType]?: LobbyPlayerResponseRepository;

  @Property()
  answer: string;

  @ManyToOne({ deleteRule: 'cascade' })
  question: QuizQuestionEntity;

  @ManyToOne({ deleteRule: 'cascade' })
  player: LobbyPlayerEntity;

  @Property({ default: false })
  isCorrect: boolean;
}
export type LobbyPlayerResponseEntityType = InstanceType<
  typeof LobbyPlayerResponseEntity
>;
