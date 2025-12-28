import { defineConfig } from "orval";

export default defineConfig({
  serverSdk: {
    input: {
      target: "http://localhost:5000/swagger.json",
    },
    output: {
      target: "./src/server/apis/sdk/generated.ts",
      client: "axios",
      override: {
        mutator: {
          path: "./src/server/apis/axios.ts",
          name: "apiClient",
        },
      },
    },
  },
});
