import { defineConfig } from "@rtqs/plugin-loader";
import packageJson from "../package.json";
import { ICONS } from "./icons";

export default defineConfig({
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,
  config: {
    type: "ICON",
    exports: ICONS,
  },
  status: "beta",
  targetVersion: "<1",
});
