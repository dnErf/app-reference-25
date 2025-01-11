export const _someCookie = (cookies: string, key: string): string => {
    let c = `; ${cookies}`
    let v = c.split(`; ${key}=`)
    return v.length >= 2
        ? v.pop().split(";").shift()
        : ""
}
