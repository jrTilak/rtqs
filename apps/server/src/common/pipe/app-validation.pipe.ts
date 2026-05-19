import {
  Injectable,
  UnprocessableEntityException,
  ValidationPipe,
} from "@nestjs/common";


@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      // Removes extra properties that are not present in specified dto
      whitelist: true,

      stopAtFirstError: process.env.NODE_ENV === "prod",
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === "prod",

      exceptionFactory(errors) {
        return new UnprocessableEntityException({
          message: "Input validation failed!",
          error: errors
        })
      },
    });
  }
}
