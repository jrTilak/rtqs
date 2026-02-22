import { defineConfig } from "@rtqs/plugin-loader";
import { VIOLET_BLOOM_THEME } from "./theme";
import packageJson from "../package.json";
import fonts from "./theme/fonts.css?raw" assert { type: "raw" };

export default defineConfig({
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,
  type: "theme",
  scope: ["web-client"],
  exports: {
    vars: VIOLET_BLOOM_THEME,
    rawCss: [fonts],
    themeType: "main",
  },
  targetVersion: "0",
  status: "beta",
});
