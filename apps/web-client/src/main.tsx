import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { PluginThemeProvider } from "./providers/plugin-theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Suspense fallback={<div>Theme Loading...</div>}>
        <PluginThemeProvider>
          <App />
        </PluginThemeProvider>
      </Suspense>
    </ThemeProvider>
  </StrictMode>,
);
