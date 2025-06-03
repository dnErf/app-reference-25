import type { APIRoute } from "astro"
import { auth } from "../../../lib/better-auth.ts"

export const ALL: APIRoute = async (ctx) => {
    console.log("auth!?")
    return auth.handler(ctx.request)
}
