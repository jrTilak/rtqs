import type { PluginConfigSchemaType } from "../define-config";
import { varsToCss } from "../vars-to-css";

export const registerThemePlugin = async ({
  config,
}: PluginConfigSchemaType) => {
  let allCss = "";

  if (config.exports?.vars) {
    allCss += varsToCss(config.exports.vars);
  }

  if (config.exports?.rawCss) {
    allCss += config.exports.rawCss.join("\n");
  }

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(allCss);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
};
