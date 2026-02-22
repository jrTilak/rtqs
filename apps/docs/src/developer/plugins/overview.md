# Plugin Configuration

RTQS uses a **plugin-first architecture**. Most features beyond the core runtime are implemented as plugins, making the system easy to extend and customize without modifying core code.

Plugins can hook into different parts of the system, including the server, client, and shared runtime. Common plugin types include:

- **Theme plugins** – UI styling and layouts
- **Icon plugins** – custom icon sets
- **Quiz logic plugins** – rules, timers, validations
- **Score calculation plugins** – custom scoring strategies
- etc

You can check the [plugin starter](https://github.com/jrTilak/rtqs/tree/master/plugin-starter) to get started with different types of plugins.

## Defining a Plugin

Plugins are defined using the `defineConfig` function from `@rtqs/plugin-loader`. This provides a **standard structure** for your plugin and ensures compatibility with the core system.

```ts
import { defineConfig } from "@rtqs/plugin-loader";
import packageJson from "../package.json";

export default defineConfig({
  name: packageJson.name,
  description: packageJson.description,
  version: packageJson.version,
  type: "theme",
  scope: ["web-client"],
  exports: ...,
  targetVersion: "0",
  status: "beta",
});
```

## Config Fields

| Field           | Type                                 | Description                                                                                                                                            |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`          | `string`                             | Unique plugin name. Ideally @rtqs/plugin-\<plugin-type\>-\<name\> (e.g., @rtqs/plugin-theme-violet-bloom). Once published, the name cannot be changed. |
| `description`   | `string`                             | Short description of the plugin’s purpose.                                                                                                             |
| `version`       | `string`                             | Current plugin version (e.g., `"1.0.0"`).                                                                                                              |
| `targetVersion` | `string`                             | The RTQS core version this plugin is compatible with (e.g., `"0.1"`).                                                                                  |
| `type`          | `string literal`                     | Type of the plugin.                                                                                                                                    |
| `scope`         | `Array`                              | Where the plugin is applied: client, server, or both.                                                                                                  |
| `exports`       | `...`                                | The actual functionality your plugin provides (depends on plugin type).                                                                                |
| `status`        | `"stable" \| "beta" \| "deprecated"` | Current stability or readiness of the plugin.                                                                                                          |
