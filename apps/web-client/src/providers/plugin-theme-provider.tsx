import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { DEFAULT_THEME_PLUGIN } from "../constants/plugins";
import { useQueries } from "@tanstack/react-query";
import {
  getPluginConfig,
  registerThemePlugin,
  ThemePluginSchema,
} from "@rtqs/plugin-loader";
import { QUERY_KEYS } from "@/constants/query-keys";

type PluginThemeProviderContextType = {
  plugins: string[];
  setPlugins?: Dispatch<
    SetStateAction<PluginThemeProviderContextType["plugins"]>
  >;
};

const PluginThemeProviderContext =
  createContext<PluginThemeProviderContextType | null>(null);

type PluginThemeProviderContextProviderProps = {
  children: ReactNode;
};

export const PluginThemeProviderContextProvider = ({
  children,
}: PluginThemeProviderContextProviderProps) => {
  const [plugins, setPlugins] = useState<
    PluginThemeProviderContextType["plugins"]
  >([DEFAULT_THEME_PLUGIN]);

  const results = useQueries({
    queries: plugins.map((plugin) => ({
      queryKey: QUERY_KEYS.plugins.theme(plugin),
      queryFn: async () => getPluginConfig(ThemePluginSchema, plugin),
    })),
  });

  useLayoutEffect(() => {
    results.forEach((result) => {
      if (result.isSuccess && result.data) {
        registerThemePlugin(result.data);
      }
    });
  }, [results]);

  return (
    <PluginThemeProviderContext.Provider value={{ plugins, setPlugins }}>
      {children}
    </PluginThemeProviderContext.Provider>
  );
};
export const usePluginThemeProvider = () => {
  const context = useContext(PluginThemeProviderContext);
  if (!context) {
    throw new Error(
      "usePluginThemeProvider must be used within a PluginThemeProvider",
    );
  }
  return context;
};
