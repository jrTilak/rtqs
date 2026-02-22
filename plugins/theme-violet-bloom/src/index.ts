import { defineConfig, THEME_PLUGIN_TYPE_ENUM } from "@rtqs/plugin-loader";
import { VIOLET_BLOOM_THEME } from "./theme";
import packageJson from "../package.json";
import fonts from "./theme/fonts.css?raw" assert { type: "raw" };

export default defineConfig({
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,
  config: {
    type: "THEME",
    exports: {
      vars: VIOLET_BLOOM_THEME,
      rawCss: [fonts],
      themeType: THEME_PLUGIN_TYPE_ENUM.MAIN,
    },
  },
  targetVersion: "<1",
  status: "beta",
});
