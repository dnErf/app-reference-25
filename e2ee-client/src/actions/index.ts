import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { createClient } from 'redis'

export const server = {
    testAction: defineAction({
        accept: 'json',
        input: z.object({
            title: z.string(),
            price: z.number()
        }),
        async handler (input) {
            console.log(input)
            const stringy = JSON.stringify(input)
            const redis = await createClient({ url: 'redis://172.30.55.194:6379' })

            try {
                await redis.connect()
                await redis.xAdd('streaming', '*', { message: stringy })

                let d = await fetch('http://localhost:5160/weatherforecast')
                d = await d.json()
                console.log(d)
            } 
            catch (err) {
                console.error(err)
            }
            
            return stringy
        }
    })
}