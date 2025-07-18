import { defineConfig } from "drizzle-kit";
import {readConfig } from "./src/config.ts"

const config = readConfig();

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.dbUrl
  },
});