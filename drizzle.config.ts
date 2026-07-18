import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"

for (const envFile of [".env.test", ".env.local", ".env"]) {
  dotenv.config({ path: envFile })
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
