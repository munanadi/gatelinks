import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL as string,
  },
  driver: "pg",
  breakpoints: true,
} satisfies Config;
