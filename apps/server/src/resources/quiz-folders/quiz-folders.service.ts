import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { QuizFolderRepository } from "./quiz-folder.repository";
import {
  CreateQuizFolderRequestDto,
  DeleteQuizFolderRequestDto,
  ListQuizFoldersRequestDto,
  UpdateQuizFolderRequestDto,
} from "./dto/request.dto";
import { QuizFolderResponseDto } from "./dto/response.dto";
import { UserSession } from "@thallesp/nestjs-better-auth";
import { QuizFolderEntity } from "./entities/quiz-folder.entity";
import { In } from "typeorm";

@Injectable()
export class QuizFoldersService {
  constructor(private readonly _quizFolderRepo: QuizFolderRepository) {}

  private async _findById(id: string): Promise<QuizFolderResponseDto> {
    const quizFolder = await this._quizFolderRepo.findOne({
      where: { id },
    });
    if (!quizFolder) {
      throw new NotFoundException(`Quiz folder with id ${id} not found`);
    }
    const childrenCount = await this._quizFolderRepo.count({
      where: { parentId: id },
    });
    return { ...quizFolder, childrenCount };
  }

  async create(
    body: CreateQuizFolderRequestDto,
    userSession: UserSession,
  ): Promise<QuizFolderResponseDto> {
    if (body.parentId) {
      const result = await this._quizFolderRepo.exists({
        where: {
          id: body.parentId,
          organizationId: userSession.session.activeOrganizationId,
        },
      });
      if (!result) {
        throw new NotFoundException(
          `Parent folder with id ${body.parentId} not found`,
        );
      }
    }

    const quizFolder = this._quizFolderRepo.create({
      ...body,
      organizationId: userSession.session.activeOrganizationId,
    });

    const saved = await this._quizFolderRepo.save(quizFolder);

    return { ...saved, childrenCount: 0 };
  }

  async list(
    query: ListQuizFoldersRequestDto,
    userSession: UserSession,
  ): Promise<QuizFolderResponseDto[]> {
    const orgId = userSession.session.activeOrganizationId;

    const qb = this._quizFolderRepo
      .createQueryBuilder("folder")
      .leftJoin(
        (subQb) =>
          subQb
            .select("c.parentId", "parentId")
            .addSelect("COUNT(*)::int", "count")
            .from(QuizFolderEntity, "c")
            .groupBy("c.parentId"),
        "children",
        '"children"."parentId" = "folder"."id"',
      )
      .addSelect("COALESCE(children.count, 0)", "childrenCount")
      .where("folder.organizationId = :orgId", { orgId })
      .orderBy("folder.pinned", "DESC")
      .addOrderBy("folder.updatedAt", "DESC");

    if (query.parentId) {
      qb.andWhere("folder.parentId = :parentId", {
        parentId: query.parentId,
      });
    } else {
      qb.andWhere("folder.parentId IS NULL");
    }

    const { entities, raw } = await qb.getRawAndEntities();

    return entities.map((folder, i) => ({
      ...folder,
      childrenCount: Number(raw[i]?.childrenCount ?? 0),
    }));
  }

  async update({
    id,
    ...body
  }: UpdateQuizFolderRequestDto): Promise<QuizFolderResponseDto> {
    const result = await this._quizFolderRepo.update(id, body);
    if (result.affected === 0) {
      throw new NotFoundException(`Quiz folder with id ${id} not found`);
    }
    return this._findById(id);
  }

  async delete({ id }: DeleteQuizFolderRequestDto): Promise<void> {
    const quizFolder = await this._quizFolderRepo.findOne({
      where: {
        id,
      },
      relations: ["children"],
    });
    if (!quizFolder) {
      throw new NotFoundException(`Quiz folder with id ${id} not found`);
    }
    if (quizFolder.children.length > 0) {
      throw new BadRequestException(
        "Quiz folder has children, please delete them first",
      );
    }

    await this._quizFolderRepo.delete(id);
  }
}
