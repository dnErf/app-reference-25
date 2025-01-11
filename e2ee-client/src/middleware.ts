import { sequence } from "astro:middleware";

function auth(context, next) {
    // console.log(context.routePattern !== "/auth/signin")
    // console.log(!!context.request.headers.get("cookie"))
    // console.log(!!context.request.headers.get("cookie") && context.routePattern !== "/auth/signin")
    if (!context.request.headers.get("cookie") && context.routePattern !== "/auth/signin") {
        // return context.redirect("/auth/signin")
    }
    return next()
}

export const onRequest = sequence(auth)
