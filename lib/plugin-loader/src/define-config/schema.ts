import z from "zod";
import { ThemePluginSchema } from "../plugin-types";

export const PluginConfigSchema = z.union([ThemePluginSchema]);

export type PluginConfigSchemaType = z.infer<typeof PluginConfigSchema>;
