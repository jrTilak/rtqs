import { PLUGINS } from "../../plugins";
import {
  PLUGIN_TYPES_ENUM,
  PluginConfigSchema,
  type PluginConfigSchemaType,
} from "../define-config";
import { registerThemePlugin } from "./register-theme-plugin";

export const registerPlugin = async (plugins: string[]) => {
  for (const plugin of plugins) {
    try {
      const pluginInstance: unknown = (await PLUGINS[plugin]?.()).default;

      if (!pluginInstance) {
        console.warn(`Plugin not found: ${plugin}`);
        continue;
      }

      const parsed = PluginConfigSchema.parse(pluginInstance);

      switch (parsed.config.type) {
        case PLUGIN_TYPES_ENUM.THEME:
          await registerThemePlugin(parsed);
          break;

        default:
          break;
      }

      console.log(`Plugin loaded successfully:`, pluginInstance);
    } catch (error) {
      console.error(`Failed to register plugin:`, error);
    }
  }
};
