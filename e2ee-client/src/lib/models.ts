import { z } from "astro:schema"

export const AuthUser = z.object({
    id: z.string(),
    email: z.string(),
    user: z.string(),
    hashed: z.string(),
    img_thumbnail: z.string(),
    dated_at: z.string(),
})

export type AuthUserAttrs = z.infer<typeof AuthUser> 

export const UserData = z.object({
    id: z.string(),
    email: z.string(),
    user: z.string(),
    img_thumbnail: z.string(),
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
    productId: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    price: z.string(),
    quantity: z.string(),
})

export type CartItemAttrs = z.infer<typeof CartItem>

export const CustomerCart = z.object({
    customerId: z.string(),
    cartItems: z.array(CartItem).or(z.any()),
})

export type CustomerCartAttrs = z.infer<typeof CustomerCart>

export const SalesItem = z.object({
    id: z.string(),
    orderId: z.string(),
    productId: z.string(),
    price: z.number(),
    quantity: z.number(),
})

export type SalesItemAttrs = z.infer<typeof SalesItem>

// TODO : delivery method | discount
export const SalesOrder = z.object({
    orderId: z.string(),
    customerId: z.string(),
    paymentId: z.string(),
    items: z.array(SalesItem),
    totalAmount: z.number(),
    status: z.string()
})

export type SalesOrderAttrs = z.infer<typeof SalesOrder>
