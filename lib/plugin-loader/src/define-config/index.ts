import { PluginConfigSchema, type PluginConfigSchemaType } from "./schema.ts";

export const defineConfig = (config: PluginConfigSchemaType) => {
  return PluginConfigSchema.parse(config);
};

export * from "./schema.ts";
