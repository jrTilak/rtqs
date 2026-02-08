import z from "zod";

const CSSVarsSchema = z.record(
  z.string().nonempty().startsWith("--"),
  z.union([z.string().nonempty(), z.number()]),
);

export enum CSS_THEME_ENUM {
  light = "light",
  dark = "dark",
}

export const ThemePluginExportsSchema = z.object({
  vars: z.record(z.enum(CSS_THEME_ENUM), CSSVarsSchema).optional(),
  rawCss: z.array(z.string().nonempty()).optional(),
});
export type ThemePluginExportsSchemaType = z.infer<
  typeof ThemePluginExportsSchema
>;
