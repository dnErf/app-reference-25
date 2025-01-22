import { INTERNAL_SERVER } from "astro:env/server"

export const _someCookie = (cookies: string, key: string): string => {
    let c = `; ${cookies}`
    let v = c.split(`; ${key}=`)
    return v.length >= 2
        ? v.pop().split(";").shift()
        : ""
}

export const _fetchAuthUser = async (token: string) => {
    let resultData = await fetch(`${INTERNAL_SERVER}/api/auth/user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return await resultData.json()
}
