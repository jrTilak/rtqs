// @ts-nocheck
export const PLUGINS: Record<string, () => Promise<any>> = {
  "@rtqs/plugin-theme-violet-bloom": () =>
    import("@rtqs/plugin-theme-violet-bloom"),
};
