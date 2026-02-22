import {
  Injectable,
  UnprocessableEntityException,
  type ValidationError,
  ValidationPipe,
} from "@nestjs/common";

/**
 * Recursively extract validation errors into { field, errors[] }
 */
function extractValidationErrors(
  errors: ValidationError[],
  parentPath = "",
): { field: string; errors: string[] }[] {
  return errors.flatMap((err) => {
    const fieldPath = parentPath
      ? `${parentPath}.${err.property}`
      : err.property;

    const messages = err.constraints ? Object.values(err.constraints) : [];

    const currentError =
      messages.length > 0 ? [{ field: fieldPath, errors: messages }] : [];

    const childErrors = err.children?.length
      ? extractValidationErrors(err.children, fieldPath)
      : [];

    return [...currentError, ...childErrors];
  });
}

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const extracted = extractValidationErrors(errors);

        const flatMessages = extracted.map(
          (e) => `${e.field}: ${e.errors.join(", ")}`,
        );

        return new UnprocessableEntityException({
          message: flatMessages.join("; "),
          error: extracted,
        });
      },
    });
  }
}
