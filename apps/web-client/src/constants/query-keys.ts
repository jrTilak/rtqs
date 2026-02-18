export const QUERY_KEYS = {
  plugins: {
    theme: (plugin: string) => ["theme-plugin", { plugin }],
    illustration: (plugin: string) => ["illustration-plugin", { plugin }],
    illustrationComponent: (plugin: string, name: string) => [
      "illustration-component",
      { plugin, name },
    ],
  },
};
