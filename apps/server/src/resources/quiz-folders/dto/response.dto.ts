import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { QuizFolderBaseDto } from "./quiz-folder.dto";
import { BaseDocDto } from "@/common/dto/response/base-doc.dto";

export class QuizFolderResponseDto extends IntersectionType(
  BaseDocDto,
  QuizFolderBaseDto,
) {
  @ApiProperty({
    description: "Number of direct child folders",
    example: 3,
  })
  childrenCount: number;
}
