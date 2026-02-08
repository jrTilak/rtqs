import type { ThemePluginExportsSchemaType } from "./plugin-types";

export const varsToCss = (vars: ThemePluginExportsSchemaType["vars"]) => {
  if (!vars) return "";

  let cssString = "";

  const selectors = {
    light: ":root",
    dark: ".dark",
  };

  for (const [theme, themeVars] of Object.entries(vars)) {
    const selector = selectors[theme as keyof typeof selectors];
    if (!selector) continue;

    const body = Object.entries(themeVars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");

    cssString += `${selector} {\n${body}\n}\n\n`;
  }

  return cssString;
};
