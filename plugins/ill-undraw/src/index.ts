import { defineConfig } from "@rtqs/plugin-loader";
import packageJson from "../package.json";
import { ILLUSTRATIONS } from "./illustrations/index";

export default defineConfig({
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,
  config: {
    type: "ILLUSTRATION",
    exports: ILLUSTRATIONS,
  },
  status: "beta",
  targetVersion: "<1",
});
