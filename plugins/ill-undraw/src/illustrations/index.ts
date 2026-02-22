import {
  ILLUSTRATIONS_ENUM,
  type IllustrationsPluginExportsSchemaType,
} from "@rtqs/plugin-loader";

export const ILLUSTRATIONS: IllustrationsPluginExportsSchemaType = {
  [ILLUSTRATIONS_ENUM.LOGIN_PAGE_ILLUSTRATION]: () => import("./adventure-map"),
};
