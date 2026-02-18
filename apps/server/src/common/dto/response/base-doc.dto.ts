import { ApiProperty } from "@nestjs/swagger";

export class BaseDocDto {
  @ApiProperty({
    example: "f0d2c7db-a055-4c01-904a-c6ef53760e44",
    required: true,
    type: "string",
    format: "uuid",
    description: "Primary id",
  })
  id: string;

  @ApiProperty({
    type: "string",
    format: "date-time",
    example: "026-01-17T07:45:30.123Z",
    required: true,
    description: "The date of creation of this doc",
  })
  createdAt: Date;

  @ApiProperty({
    type: "string",
    format: "date-time",
    example: "026-01-17T07:45:30.123Z",
    required: true,
    description: "The last updated date of this doc",
  })
  updatedAt: Date;
}
