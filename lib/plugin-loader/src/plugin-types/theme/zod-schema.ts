import z from "zod";
import { createPluginConfigSchema } from "../../define-config/create-plugin-config-schema";
import { CSS_THEME_VARS_TYPE, THEME_PLUGIN_TYPE } from "./constants";

const CSSVarsSchema = z.record(
  z.string().nonempty().startsWith("--"),
  z.union([z.string().nonempty(), z.number()]),
);

export const ThemePluginExportsSchema = z.object({
  /**
   * A record of CSS variables for each theme. The keys should be valid CSS variable names (starting with --) and the values can be either strings or numbers. The top-level keys should be "light" and/or "dark" to indicate which theme the variables belong to.
   * This is supposed for simple use cases where plugins want to provide a set of CSS variables for theming purposes.
   */
  vars: z.record(z.enum(CSS_THEME_VARS_TYPE), CSSVarsSchema).optional(),

  /**
   * An array of raw CSS strings. This allows plugins to provide more complex CSS that may not fit the simple vars structure, such as media queries, keyframes, or any other valid CSS. Each string in the array should be a complete CSS rule or block.
   */
  rawCss: z.array(z.string().nonempty()).optional(),

  themeType: z.enum(THEME_PLUGIN_TYPE),
});
export type ThemePluginExportsSchemaType = z.infer<
  typeof ThemePluginExportsSchema
>;

export const ThemePluginSchema = createPluginConfigSchema(
  "theme",
  ThemePluginExportsSchema,
);
export type ThemePluginSchemaType = z.infer<typeof ThemePluginSchema>;
