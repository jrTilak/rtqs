import type { PluginConfigSchemaType } from "../define-config";
import { varsToCss } from "../vars-to-css";

export const registerThemePlugin = async ({
  config,
  name,
}: PluginConfigSchemaType) => {
  let cssFiles: string[] = [];
  if (config.exports?.vars) {
    cssFiles.push(varsToCss(config.exports.vars));
  }

  cssFiles.push(...(config.exports?.rawCss || []));

  cssFiles.forEach((css, index) => {
    const id = `${name}__style-${index}`;
    let styleEl = document.getElementById(id) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = id;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
  });
};
