import { defineConfig } from "@rtqs/plugin-loader";
import packageJson from "../package.json";
import { ILLUSTRATIONS } from "./illustrations/index";

export default defineConfig({
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,
  type: "illustration",
  exports: ILLUSTRATIONS,
  status: "beta",
  targetVersion: "0",
  scope: ["web-client"],
});
