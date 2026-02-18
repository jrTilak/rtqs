import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, ArrayNotEmpty, IsUUID, IsString } from "class-validator";

export function IsArrayOfId(description?: string) {
  return applyDecorators(
    ApiProperty({
      type: "array",
      items: {
        type: "string",
        format: "uuid",
        example: "880e758b-4974-4b85-a124-a39665a4c5f5",
      },
      required: true,
      description: description || "Array of IDs (UUID)",
    }),
    Transform(({ value }) => (typeof value === "string" ? [value] : value)),
    IsArray(),
    ArrayNotEmpty(),
    IsString({ each: true }),
    IsUUID(undefined, { each: true }),
  );
}
