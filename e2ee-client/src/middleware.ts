import { sequence } from "astro:middleware";

function auth(context, next) {
    console.log("===")
    console.log("middleware")
    console.log("===")
    return next()
}

export const onRequest = sequence(auth)
