export interface EnvSchemaItem {
  name: string;
  required?: boolean;
  default?: string;
  enum?: readonly string[];
}

export const ENV_SCHEMA = [
  { name: "SERVER_PORT", default: "5000" },
  {
    name: "NODE_ENV",
    enum: ["dev", "prod"],
    default: "dev",
  },
  { name: "ENABLE_SWAGGER", default: "true" },
  { name: "SWAGGER_PATH", default: "/api/docs/" },
  { name: "LOG_LEVEL", default: "info" },
  { name: "CORS_ORIGINS", required: false },

  { name: "DB_CONNECTION_STRING" },

  { name: "BETTER_AUTH_SECRET" },
  { name: "BETTER_AUTH_URL" },

  { name: "GOOGLE_CLIENT_ID" },
  { name: "GOOGLE_CLIENT_SECRET" },

  // R2 Object Storage
  { name: "R2_ACCOUNT_ID" },
  { name: "R2_ACCESS_KEY_ID" },
  { name: "R2_SECRET_ACCESS_KEY" },
  { name: "R2_BUCKET_NAME" },
] as const;

export type ParsedEnvType = {
  [K in (typeof ENV_SCHEMA)[number] as K["name"]]: K extends {
    enum: readonly string[];
  }
    ? K["enum"][number]
    : string;
};
