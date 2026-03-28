import { Module } from "@nestjs/common";
import { QuizFoldersService } from "./quiz-folders.service";
import { QuizFoldersController } from "./quiz-folders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizFolderEntity } from "./entities/quiz-folder.entity";
import { QuizFolderRepository } from "./quiz-folder.repository";

@Module({
  controllers: [QuizFoldersController],
  providers: [QuizFoldersService, QuizFolderRepository],
  imports: [TypeOrmModule.forFeature([QuizFolderEntity])],
})
export class QuizFoldersModule {}
