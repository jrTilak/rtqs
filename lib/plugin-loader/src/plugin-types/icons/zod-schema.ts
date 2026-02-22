import z from "zod";
import { createPluginConfigSchema } from "../../define-config/create-plugin-config-schema";
import { ICONS_ENUM } from "./constants";

export const IconsPluginExportsSchema = z.record(
  z.enum(ICONS_ENUM),
  z.function(),
);
export type IconsPluginExportsSchemaType<R = any> = Record<
  ICONS_ENUM,
  // A dynamic React component that can be imported asynchronously
  () => R | Promise<R>
>;

export const IconPluginSchema = createPluginConfigSchema(
  "ICON",
  IconsPluginExportsSchema,
);
export type IconPluginSchemaType = z.infer<typeof IconPluginSchema>;
