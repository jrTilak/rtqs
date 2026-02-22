export enum CSS_THEME_ENUM {
  light = "light",
  dark = "dark",
}

export enum THEME_PLUGIN_TYPE_ENUM {
  /**
   * The main theme plugin that provides the core CSS variables and styles for the application.
   */
  "MAIN" = "MAIN",

  /**
   * A supplementary theme plugin that provides additional styles or overrides for specific components or features. This type of plugin is meant to be used alongside a main theme plugin and may not work properly on its own.
   */
  "SUPPLEMENTARY" = "SUPPLEMENTARY",
}
