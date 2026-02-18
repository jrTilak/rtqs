import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from "@/common/validations/length";

@Entity("user")
export class UserEntity extends BaseEntity {
  @Column({ nullable: true, length: NAME_MAX_LENGTH })
  name?: string;

  @Column({ unique: true, length: EMAIL_MAX_LENGTH })
  email: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  image?: string;

  @Column({ unique: true, length: USERNAME_MAX_LENGTH })
  username: string;

  @Column({ length: USERNAME_MAX_LENGTH })
  displayUsername: string;

  @Column()
  isAnonymous?: boolean;
}

@Entity("session")
export class SessionEntity extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ unique: true })
  token: string;

  @Column({ type: "timestamptz" })
  expiresAt: Date;

  @Column({ nullable: true })
  ipAddress?: string;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ nullable: true })
  activeOrganizationId?: string;

  @Column({ nullable: true })
  activeTeamId?: string;
}

@Entity("organization")
export class OrganizationEntity extends BaseEntity {
  @Column({ length: NAME_MAX_LENGTH })
  name: string;

  @Column({ unique: true, length: USERNAME_MAX_LENGTH })
  slug: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true, type: "text" })
  metadata?: string;
}

@Entity("member")
export class MemberEntity extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column()
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "organizationId" })
  organization: OrganizationEntity;

  @Column()
  role: string;
}

@Entity("invitation")
export class InvitationEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  inviterId: string;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "inviterId" })
  inviter: UserEntity;

  @Column()
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "organizationId" })
  organization: OrganizationEntity;

  @Column()
  role: string;

  @Column()
  status: string;

  @Column({ type: "timestamptz" })
  expiresAt: Date;

  @Column({ nullable: true })
  teamId?: string;
}

@Entity("organizationRole")
export class OrganizationRoleEntity extends BaseEntity {
  @Column()
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "organizationId" })
  organization: OrganizationEntity;

  @Column()
  role: string;

  @Column()
  permission: string;
}

@Entity("account")
export class AccountEntity extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column()
  accountId: string;

  @Column()
  providerId: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ type: "timestamptz", nullable: true })
  accessTokenExpiresAt?: Date;

  @Column({ type: "timestamptz", nullable: true })
  refreshTokenExpiresAt?: Date;

  @Column({ nullable: true })
  scope?: string;

  @Column({ nullable: true })
  idToken?: string;

  @Column({ nullable: true })
  password?: string;
}

@Entity("verification")
export class VerificationEntity extends BaseEntity {
  @Column()
  identifier: string;

  @Column()
  value: string;

  @Column({ type: "timestamptz" })
  expiresAt: Date;
}
