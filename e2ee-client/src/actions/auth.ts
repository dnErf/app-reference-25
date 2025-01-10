import { z } from "astro:schema"
import { defineAction } from "astro:actions"
import { INTERNAL_SERVER } from "astro:env/server"

export const authActions = {
    signIn: defineAction({
        accept: "form",
        input: z.object({
            email: z.string(),
            password: z.string(),
        }),
        async handler(input, _) {
            // console.log(input)
            console.log("===")
            
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

            let data = await response.json()
            return {
                token: data.token
            }
        },
    })
}
