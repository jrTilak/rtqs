export const QUERY_KEYS = {
  plugins: {
    theme: (plugin: string) => ["theme-plugin", { plugin }],
    illustration: (plugin: string) => ["illustration-plugin", { plugin }],
    illustrationComponent: (plugin: string, name: string) => [
      "illustration-component",
      { plugin, name },
    ],
    icon: (plugin: string) => ["icon-plugin", { plugin }],
    iconComponent: (plugin: string, name: string) => [
      "icon-component",
      { plugin, name },
    ],
  },
  auth: {
    session: () => ["auth", "session"],
    userOrganizations: () => ["auth", "user-organizations"],
  },
};
