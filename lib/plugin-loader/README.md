# Plugin Loader

## Theme Plugin

Them entry point and/or export:

```ts
import css from "./theme.css?raw";
export default {
  vars:{
    light: {
      ...
    },
    dark: {
      ....
    }
  },
  css:[
    "raw css",
    ...
  ]
}

```
