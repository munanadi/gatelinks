import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "./src/db/schema.ts",
  out: "./src/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  driver: "mysql2",
  breakpoints: true,
} satisfies Config;
