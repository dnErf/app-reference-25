import "dotenv/config"
import { createDirectus, rest, readItems, staticToken } from "@directus/sdk"

interface Zample {
    id: number;
    vfile: string;
}

interface Schema {
    zample: Zample[];
}

export const directus = createDirectus<Schema>(process.env.DIRECTUS_URL!)
    .with(staticToken(process.env.DIRECTUS_STATIC_TOKEN!))
    .with(rest())

export const zample = {
    test: async () => {
        return await directus.request(
            readItems("zample", {
                fields: ["id", "vfile"]
            })
        )
    }
}
