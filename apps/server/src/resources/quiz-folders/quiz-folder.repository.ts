import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { QuizFolderEntity } from "./entities/quiz-folder.entity";

@Injectable()
export class QuizFolderRepository extends Repository<QuizFolderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(QuizFolderEntity, dataSource.createEntityManager());
  }
}
