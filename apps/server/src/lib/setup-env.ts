import { config } from "dotenv";

export const setupEnv = () => {
  config({
    path: `.env.${process.env.NODE_ENV || "dev"}`,
  });
};
