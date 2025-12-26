import { plainToInstance } from "class-transformer";
import { validateSync, IsNotEmpty, IsOptional, IsString, IsEmail } from "class-validator";
import { logger } from "@/lib/logger";

class Env {
  @IsString()
  @IsOptional()
  PORT?: string = "5000";

  @IsString()
  @IsNotEmpty()
  NODE_ENV: "development" | "production" = "development";

  @IsString()
  @IsOptional()
  ENABLE_SWAGGER?: string = "true";

  @IsString()
  @IsOptional()
  LOG_LEVEL?: string = "info";

  @IsString()
  @IsOptional()
  CORS_ORIGINS?: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string

  @IsString()
  @IsNotEmpty()
  MAIL_CREDS_PATH: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  SUPER_ADMIN_EMAIL: string
}

export type EnvConfig = InstanceType<typeof Env>

export const validateEnv = () => {
  // convert process.env to DTO
  const validatedConfig = plainToInstance(Env, process.env);

  // validate
  const errors = validateSync(validatedConfig, {
    whitelist: false,
  });

  if (errors.length > 0) {
    logger.error("Environment validation failed:");
    logger.error(errors.map((err) => Object.values(err.constraints ?? {})));
    process.exit(1);
  }

  // overwrite process.env with validated values
  Object.entries(validatedConfig).forEach(([key, value]) => {
    if (value !== undefined) {
      process.env[key] = value; // all values are already strings
    }
  });
};
