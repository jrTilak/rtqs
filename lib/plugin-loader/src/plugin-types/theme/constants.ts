export const CSS_THEME_VARS_TYPE = {
  light: "light",
  dark: "dark",
} as const;

export const THEME_PLUGIN_TYPE = {
  /**
   * The main theme plugin that provides the core CSS variables and styles for the application.
   */
  MAIN: "main",

  /**
   * A supplementary theme plugin that provides additional styles or overrides for specific components or features. This type of plugin is meant to be used alongside a main theme plugin and may not work properly on its own.
   */
  SUPPLEMENTARY: "supplementary",
} as const;
