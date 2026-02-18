import type z from "zod";
import { PLUGINS } from "../plugins";

/**
 *  Fetches and validates the plugin configuration based on the provided schema and plugin name.
 */
export const getPluginConfig = async <T extends z.ZodSchema>(
  configSchema: T,
  plugin: string,
) => {
  const pluginInstance: unknown = (await PLUGINS[plugin]?.()).default;

  if (!pluginInstance) {
    throw new Error(`Plugin not found: ${plugin}, Skipping registration.`);
  }

  const parsed = configSchema.parse(pluginInstance);

  return parsed;
};
