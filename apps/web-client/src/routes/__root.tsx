import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";
import { getPluginConfig, ThemePluginSchema } from "@rtqs/plugin-loader";
import { DEFAULT_THEME_PLUGIN } from "@/constants/plugins";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { PluginThemeProviderContextProvider } from "@/providers/plugin-theme-provider";
import type { RouterContext } from "@/main";
import { QUERY_KEYS } from "@/constants/query-keys";
import { querySessionOptions } from "@/server/rest-api/auth";

export const Route = createRootRoute({
  component: RootComponent,
  loader: async ({ context, location }) => {
    const { queryClient } = context as RouterContext;

    await queryClient.ensureQueryData({
      queryKey: QUERY_KEYS.plugins.theme(DEFAULT_THEME_PLUGIN),
      queryFn: () => getPluginConfig(ThemePluginSchema, DEFAULT_THEME_PLUGIN),
    });

    if (location.pathname === "/auth/login") return;

    try {
      const res = await queryClient.fetchQuery(querySessionOptions);
      if (!res) {
        throw new Error("No active session");
      }
    } catch {
      throw redirect({ to: "/auth/login" });
    }
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
