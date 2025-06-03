import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/drizzle/schema.ts",
    out: "./src/lib/drizzle/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})
