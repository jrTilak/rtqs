import { defineConfig } from "@rtqs/plugin-loader";
import packageJson from "../package.json";
import { ICONS } from "./icons";

export default defineConfig({
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,
  type: "icon",
  exports: ICONS,
  status: "beta",
  targetVersion: "0",
  scope: ["web-client"],
});
