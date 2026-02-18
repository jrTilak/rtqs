// @ts-nocheck
export const PLUGINS: Record<string, () => Promise<any>> = {
  "@rtqs/plugin-ill-undraw": () => import("@rtqs/plugin-ill-undraw"),
  "@rtqs/plugin-theme-violet-bloom": () => import("@rtqs/plugin-theme-violet-bloom"),
};
