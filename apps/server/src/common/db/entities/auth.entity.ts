import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base-entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  emailVerified: boolean;

  @Property({ nullable: true })
  image?: string;

  @Property({ nullable: true })
  role?: string;

  @Property({ nullable: true })
  banned?: boolean;

  @Property({ nullable: true })
  banReason?: string;

  @Property({ nullable: true })
  banExpires?: Date;
}

@Entity()
export class Session extends BaseEntity {
  @Property()
  userId: string; // FK to User

  @Property()
  token: string;

  @Property()
  expiresAt: Date;

  @Property({ nullable: true })
  ipAddress?: string;

  @Property({ nullable: true })
  userAgent?: string;

  @Property({ nullable: true })
  impersonatedBy: string;
}

@Entity()
export class Account extends BaseEntity {
  @Property()
  userId: string; // FK to User

  @Property()
  accountId: string;

  @Property()
  providerId: string;

  @Property({ nullable: true })
  accessToken?: string;

  @Property({ nullable: true })
  refreshToken?: string;

  @Property({ nullable: true })
  accessTokenExpiresAt?: Date;

  @Property({ nullable: true })
  refreshTokenExpiresAt?: Date;

  @Property({ nullable: true })
  scope?: string;

  @Property({ nullable: true })
  idToken?: string;

  @Property({ nullable: true })
  password?: string; // for email/password accounts
}

@Entity()
export class Verification extends BaseEntity {
  @Property()
  identifier: string;

  @Property()
  value: string;

  @Property()
  expiresAt: Date;
}
