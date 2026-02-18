import z from "zod";
import { IllustrationPluginSchema, ThemePluginSchema } from "../plugin-types";

export const PluginConfigSchema = z.union([
  ThemePluginSchema,
  IllustrationPluginSchema,
]);

export type PluginConfigSchemaType = z.infer<typeof PluginConfigSchema>;
