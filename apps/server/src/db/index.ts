import { setupEnv } from "@/lib/setup-env";
import path from "node:path";

import { DataSource } from "typeorm";

setupEnv();

export const dataSource = new DataSource({
  migrationsRun: true,
  type: "postgres",
  synchronize: false,

  url: process.env.DB_CONNECTION_STRING,

  entities: [path.join(__dirname, "..", "**", "*.entity.{ts,js}")],
  migrations: [path.join(__dirname, "migrations", "*.{ts,js}")],
});
