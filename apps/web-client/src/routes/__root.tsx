import { Outlet, createRootRoute } from "@tanstack/react-router";
import { getPluginConfig, ThemePluginSchema } from "@rtqs/plugin-loader";
import { DEFAULT_THEME_PLUGIN } from "@/constants/plugins";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { PluginThemeProviderContextProvider } from "@/providers/plugin-theme-provider";
import type { RouterContext } from "@/main";

export const Route = createRootRoute({
  component: RootComponent,
  loader: async ({ context }) => {
    const { queryClient } = context as RouterContext;

    await queryClient.ensureQueryData({
      queryKey: ["theme-plugin", DEFAULT_THEME_PLUGIN],
      queryFn: () => getPluginConfig(ThemePluginSchema, DEFAULT_THEME_PLUGIN),
    });
    return null;
  },
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryProvider>
        <PluginThemeProviderContextProvider>
          <Outlet />
        </PluginThemeProviderContextProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
