import "dotenv/config"
import { betterAuth } from "better-auth"
import { createAuthClient } from "better-auth/client"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { db } from "./drizzle/db.ts"
import { schema } from "./drizzle/schema.ts"

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg", schema }),
    baseURL: process.env.APP_BASE_URL,
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
        }
    }
})

export const better_auth_client = createAuthClient({
    baseURL: process.env.APP_BASE_URL,
})

export const better_auth_provider = "github"
