import { defineConfig, PLUGIN_TYPES_ENUM } from "@rtqs/plugin-loader";
import { VIOLET_BLOOM_THEME } from "./theme";
import packageJson from "../package.json";

export default defineConfig({
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,
  config: {
    type: PLUGIN_TYPES_ENUM.THEME,
    exports: {
      vars: VIOLET_BLOOM_THEME,
    },
  },
});
