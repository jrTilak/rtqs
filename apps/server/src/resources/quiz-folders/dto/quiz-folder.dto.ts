import {
  HEX_COLOR_MAX_LENGTH,
  HEX_COLOR_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from "@/common/validations/length";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsHexColor,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class QuizFolderBaseDto {
  @ApiProperty({
    description: "Name of the folder",
    example: "My Quizzes",
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
  })
  @IsString()
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name: string;

  @ApiPropertyOptional({
    description: "Hex color for the folder",
    example: "#FF5733",
    maxLength: HEX_COLOR_MAX_LENGTH,
    minLength: HEX_COLOR_MIN_LENGTH,
  })
  @IsOptional()
  @IsHexColor()
  @MinLength(HEX_COLOR_MIN_LENGTH)
  @MaxLength(HEX_COLOR_MAX_LENGTH)
  color?: string;

  @ApiPropertyOptional({
    description: "Parent folder ID for nesting",
    example: "a1b2c3d4-...",
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiPropertyOptional({
    description: "Whether the folder is pinned",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  pinned?: boolean;

  @ApiPropertyOptional({
    description: "Whether the folder is starred",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  starred?: boolean;

  @ApiProperty({
    description: "Organization ID",
    example: "a1b2c3d4-...",
  })
  @IsUUID()
  organizationId: string;
}
