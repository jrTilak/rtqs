## Theme Plugin

Theme plugins allow you to **customize the UI and styling** of RTQS by defining **CSS variables, raw CSS, and the theme type**. The following fields are available in the plugin `exports` object:

- **`vars`** – Optional. Define CSS variables for your theme, organized by `light` and/or `dark`. You can create any variable you want, unless the core website already uses it. By default, the RTQS web client uses a set of predefined variables (`shadVar` and extended CSS variables), which you can reference or override. See the default list [here](https://github.com/jrTilak/rtqs/blob/master/apps/web-client/src/index.css#L18-L78).

- **`rawCss`** – Optional. An array of raw CSS strings. Use this to define styles that cannot be expressed through `vars`, such as media queries, keyframes, or component-specific overrides. Each string should be a complete CSS block.

- **`themeType`** – Required. Specifies the **role of the theme plugin**. This determines how the plugin interacts with the system:
  - **MAIN** – The primary theme plugin providing core CSS variables and styles for the application. Required for proper UI rendering.
  - **SUPPLEMENTARY** – A secondary theme plugin that adds extra styles or overrides for specific components. Must be used alongside a `MAIN` plugin; cannot function independently.

**Example:**

```ts
import { defineConfig } from "@rtqs/plugin-loader";
import { VIOLET_BLOOM_THEME } from "./theme";
import packageJson from "../package.json";
import fonts from "./theme/fonts.css?raw" assert { type: "raw" };

export default defineConfig({
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,
  type: "theme",
  scope: ["web-client"],
  exports: {
    vars: VIOLET_BLOOM_THEME, // light/dark CSS variables
    rawCss: [fonts], // extra CSS rules or fonts
    themeType: "main", // main or supplementary
  },
  targetVersion: "0",
  status: "beta",
});
```
