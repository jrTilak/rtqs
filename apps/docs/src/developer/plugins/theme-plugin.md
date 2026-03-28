## Theme Plugin

Theme plugins customize the UI and styling of RTQS. Use `defineConfig` with `type: "theme"` and `scope: ["web-client"]` as described in the [plugin overview](./overview.md). Theme-specific behavior is defined in the **`exports`** object.

### Exports

| Field       | Type                        | Required | Description                                                                                                                                                                                                                                                                               |
| ----------- | --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vars`      | `object`                    | No       | CSS variables per mode: `light` and/or `dark`. Keys are CSS custom property names (e.g. `--background`), values are strings or numbers. See the web client’s [default variables](https://github.com/jrTilak/rtqs/blob/master/apps/web-client/src/index.css#L18-L78) for the expected set. |
| `rawCss`    | `string[]`                  | No       | Array of raw CSS strings for rules that can’t be expressed via `vars` (e.g. `@import` for fonts, keyframes, media queries). Each entry must be a complete CSS block.                                                                                                                      |
| `themeType` | `"main" \| "supplementary"` | Yes      | **`main`** – primary theme providing core variables and styles (required for full UI). **`supplementary`** – extra styles/overrides; must be used with a main theme.                                                                                                                      |

### Typing theme variables

Use `ThemePluginExportsSchemaType["vars"]` from `@rtqs/plugin-loader` so your theme object matches the expected shape:

```ts
import { type ThemePluginExportsSchemaType } from "@rtqs/plugin-loader";

export const MY_THEME: ThemePluginExportsSchemaType["vars"] = {
  light: {
    "--background": "oklch(0.99 0 0)",
    "--foreground": "oklch(0 0 0)",
    // ... other variables
  },
  dark: {
    "--background": "oklch(0.22 0.01 271)",
    "--foreground": "oklch(0.95 0 0)",
    // ... other variables
  },
};
```

### Including raw CSS (e.g. fonts)

Import CSS as a raw string and pass it in `rawCss`:

```ts
import fontsCss from "./theme/fonts.css?raw" assert { type: "raw" };

export default defineConfig({
  // ... standard config (name, description, version, type, scope, etc.)
  exports: {
    vars: MY_THEME,
    rawCss: [fontsCss],
    themeType: "main",
  },
});
```

Your `fonts.css` can use `@import` for external fonts or any other valid CSS.

See [plugin-theme-starter](https://github.com/jrTilak/rtqs/tree/master/plugin-starter/plugin-theme-starter) for a full theme plugin. Theme-specific pieces are:
