import {
  HEX_COLOR_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "@/common/validations/length";
import { OrganizationEntity } from "@/db/entities";
import { BaseEntity } from "@/db/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity("quiz_folder")
export class QuizFolderEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: NAME_MAX_LENGTH,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    length: HEX_COLOR_MAX_LENGTH,
    nullable: true,
  })
  color?: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  organizationId: string;

  @ManyToOne(() => OrganizationEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "organizationId" })
  organization: OrganizationEntity;

  @OneToMany(() => QuizFolderEntity, (child) => child.parent)
  children: QuizFolderEntity[];

  @Column({
    type: "uuid",
    nullable: true,
  })
  parentId?: string;

  @ManyToOne(() => QuizFolderEntity, (parent) => parent.children, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parentId" })
  parent?: QuizFolderEntity;

  @Column({
    type: "boolean",
    default: false,
  })
  pinned: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  starred: boolean;
}
