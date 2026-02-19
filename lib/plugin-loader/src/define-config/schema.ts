import z from "zod";
import { IllustrationPluginSchema, ThemePluginSchema } from "../plugin-types";
import { IconPluginSchema } from "../plugin-types/icons/zod-schema";

export const PluginConfigSchema = z.union([
  ThemePluginSchema,
  IllustrationPluginSchema,
  IconPluginSchema,
]);

export type PluginConfigSchemaType = z.infer<typeof PluginConfigSchema>;
