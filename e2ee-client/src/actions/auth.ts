import { z } from "astro:schema"
import { defineAction } from "astro:actions"
import { INTERNAL_SERVER, DIRECTUS_URL, DIRECTUS_BEARER, DIRECTUS_FILE_FOLDER } from "astro:env/server"

export const authActions = {
    signIn: defineAction({
        accept: "form",
        input: z.object({
            email: z.string(),
            password: z.string(),
        }),
        async handler(input, context) {
            let response = await fetch(`${INTERNAL_SERVER}/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: input.email,
                    password: input.password
                })
            }) 

            let authData = await response.json()
            
            context.cookies.set("token", authData.token, { expires: new Date(Date.parse(authData.expire_at)), path: "/" })

            return {
                ...authData
            }
        },
    }),
    register: defineAction({
        accept: "form",
        input: z.object({
            email: z.string(),
            user: z.string(),
            password: z.string(),
            password_pair: z.string(),
            file_input: z.any()
        }),
        handler: async (input, context) => {
            console.log(input.file_input)

            // TODO folder init?
            let fd = new FormData()
            fd.append("folder", DIRECTUS_FILE_FOLDER)
            fd.append("files", input.file_input)

            try {
                let paystub = await fetch(`${DIRECTUS_URL}/files`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${DIRECTUS_BEARER}`,
                    },
                    body: fd
                })

                console.log("===")
                console.log(paystub)
                let data = await paystub
                console.log(data)
            }
            catch (err) {
                console.log(err)
            }            
        }
    })
}
