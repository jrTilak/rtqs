import z from "zod";
import { PLUGIN_TYPES_ENUM } from "./constants";
import { ThemePluginExportsSchema } from "../plugin-types/theme/exports";

const ThemePluginSchema = z.object({
  type: z.literal(PLUGIN_TYPES_ENUM.THEME),
  exports: ThemePluginExportsSchema,
});
export type ThemePluginSchemaType = z.infer<typeof ThemePluginSchema>;

export const PluginConfigSchema = z.object({
  name: z
    .string({ error: "Please provide a valid plugin name" })
    .nonempty({ error: "Please provide a valid plugin name" }),
  description: z.string().optional(),
  config: z.union([ThemePluginSchema]),
  version: z.string().nonempty(),
});

export type PluginConfigSchemaType = z.infer<typeof PluginConfigSchema>;
