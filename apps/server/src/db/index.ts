import { setupEnv } from "@/lib/setup-env";
import path from "node:path";

import { DataSource } from "typeorm";

setupEnv();

export const dataSource = new DataSource({
  migrationsRun: true,
  type: "postgres",
  synchronize: false,

  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,

  entities: [path.join(__dirname, "..", "**", "*.entity.{ts,js}")],
  migrations: [path.join(__dirname, "migrations", "*.{ts,js}")],
});
