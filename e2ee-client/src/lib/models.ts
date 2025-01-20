import { z } from "astro:schema"

export const UserData = z.object({
    id: z.string(),
    email: z.string(),
    user: z.string(),
    thumbnail: z.string(),
})

export type UserDataAttrs = z.infer<typeof UserData>

export const Product = z.object({
    identifier: z.string(),
    product_id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    cost: z.string(),
    price: z.string(),
    quantity: z.number(),
    committed: z.number(),
    main_img: z.string(),
    dated_at: z.string()
})

export type ProductAttrs = z.infer<typeof Product>

export const CartItem = z.object({
    customerId: z.string(),
    products: z.array(Product)
})

export type CartItemAttrs = z.infer<typeof CartItem>
