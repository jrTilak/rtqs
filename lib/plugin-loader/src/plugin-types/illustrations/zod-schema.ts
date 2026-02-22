import z from "zod";
import { ILLUSTRATIONS_ENUM } from "./constants";
import { createPluginConfigSchema } from "../../define-config/create-plugin-config-schema";

export const IllustrationsPluginExportsSchema = z.record(
  z.enum(ILLUSTRATIONS_ENUM),
  z.function(),
);
export type IllustrationsPluginExportsSchemaType<R = any> = Record<
  ILLUSTRATIONS_ENUM,
  // A dynamic React component that can be imported asynchronously
  () => R | Promise<R>
>;

export const IllustrationPluginSchema = createPluginConfigSchema(
  "illustration",
  IllustrationsPluginExportsSchema,
);
export type IllustrationPluginSchemaType = z.infer<
  typeof IllustrationPluginSchema
>;
