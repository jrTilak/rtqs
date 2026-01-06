import { BaseEntity } from '@/common/db/entities/base-entity';
import { QuizEntity } from '@/modules/quizzes/entities';
import { Entity, Enum, Index, ManyToOne, Property } from '@mikro-orm/core';

export enum QuizLobbyStatsEnum {
  IN_LOBBY = 'IN_LOBBY',
  ENDED = 'ENDED',
}

@Entity()
export class QuizLobbyEntity extends BaseEntity {
  @Property()
  @Index()
  code: string;

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
