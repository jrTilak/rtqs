import { varsToCss } from "../../lib/vars-to-css";
import { type ThemePluginSchemaType } from "./zod-schema";

/**
 *  Registers a theme plugin by injecting the provided CSS variables and raw CSS into the document.
 * @warn It is not recommended to multiple MAIN theme plugins at the same time, as they may conflict with each other.
 */
export const registerThemePlugin = async ({
  name,
  ...config
}: ThemePluginSchemaType) => {
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
  return true;
};
