import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from "@nestjs/swagger";
import { QuizFolderBaseDto } from "./quiz-folder.dto";
import { IsId } from "@/common/decorators/validations/is-id.decorator";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateQuizFolderRequestDto extends OmitType(QuizFolderBaseDto, [
  "organizationId",
]) {}

export class UpdateQuizFolderRequestDto extends PartialType(
  CreateQuizFolderRequestDto,
) {
  @IsId("ID of the folder to update")
  id: string;
}

export class ListQuizFoldersRequestDto {
  @ApiPropertyOptional({
    description:
      "ID of the parent folder to list, if not provided, will list only root folders",
    example: "a1b2c3d4-...",
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}

export class DeleteQuizFolderRequestDto {
  @ApiProperty({
    description: "ID of the folder to delete",
    example: "a1b2c3d4-...",
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
