import { registerPlugin } from "@rtqs/plugin-loader";
import { use, type ReactNode } from "react";
import { DEFAULT_THEME_PLUGIN } from "../constants/plugins";

const pluginPromise = registerPlugin([DEFAULT_THEME_PLUGIN]);

export function PluginThemeProvider({ children }: { children: ReactNode }) {
  use(pluginPromise);
  return <>{children}</>;
}
