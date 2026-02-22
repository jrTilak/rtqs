import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@rtqs/docs",
  description: "A Real Time Quiz System",
  srcDir: "src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/docs/overview" },
      { text: "Developer Guide", link: "/developer/overview" },
    ],

    sidebar: {
      "/developer/": [
        {
          text: "Guide",
          items: [],
        },
      ],

      "/config/": [],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/jrtilak/rtqs" }],
    footer: {
      copyright: "Copyright © 2026 @jrtilak",
      message: "Released under the MIT License.",
    },
  },
});
