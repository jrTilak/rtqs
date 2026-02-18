import { logger } from "@/lib/logger";
import { ENV_SCHEMA, type EnvSchemaItem } from "./env.schema";

export function validateEnv(): void {
  const errors: string[] = [];

  for (const schema of ENV_SCHEMA) {
    const {
      name,
      required = true,
      default: defaultValue,
      enum: allowedValues,
    } = schema as EnvSchemaItem;

    const rawValue = process.env[name];
    let value = rawValue || "";

    if (!value) {
      if (defaultValue) {
        value = defaultValue;
        process.env[name] = value;
      } else if (required) {
        errors.push(
          `${name} is required but no value or default was provided.`,
        );
        continue;
      }
    }

    if (value && allowedValues && !allowedValues.includes(value)) {
      errors.push(
        `${name} must be one of: ${allowedValues.join(", ")} (got: "${value}")`,
      );
      continue;
    }

    if (value) {
      process.env[name] = value;
    }

    // Log the final state for debugging
    console.log(
      `${name}: ${process.env[name] || "undefined"}${
        !rawValue && defaultValue ? " (default)" : ""
      }`,
    );
  }

  if (errors.length > 0) {
    logger.error("Environment validation failed");
    errors.forEach((e) => {
      logger.error(e);
    });
    process.exit(1);
  }
}
