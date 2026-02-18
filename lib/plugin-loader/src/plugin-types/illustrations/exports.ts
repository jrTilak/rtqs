import z from "zod";
import { ILLUSTRATIONS_ENUM } from "./constants";

export const IllustrationsPluginExportsSchema = z.record(
  z.enum(ILLUSTRATIONS_ENUM),
  z.function(),
);
export type IllustrationsPluginExportsSchemaType = Record<
  ILLUSTRATIONS_ENUM,
  () => any | Promise<any>
>;
