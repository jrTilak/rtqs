import { defineConfig } from "orval";
import "dotenv/config";

export default defineConfig({
  apiSdk: {
    input: process.env.VITE_PUBLIC_SERVER_URL + "/swagger/api-reference.json",

    output: {
      target: "./src/server/rest-api/generated/api-sdk.ts",
      client: "axios",
      override: {
        mutator: {
          path: "./src/server/rest-api/axios.ts",
          name: "apiClient",
        },
      },
    },

    hooks: {
      afterAllFilesWrite: [
        () => {
          console.log("Orval finished generating SDK ✅");
        },
      ],
    },
  },
});
