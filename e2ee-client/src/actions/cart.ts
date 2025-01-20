import { db, customer_cart, sql } from "astro:db"
import { defineAction } from "astro:actions"

import { CartItem } from "@/lib/models"

export const cartActions = {
    addCartItem: defineAction({
        accept: "json",
        input: CartItem,
        handler: async (input, ctx) => {
            const cartItemsByCustomer = await db
                .insert(customer_cart)
                .values({ customerId: input.customerId, products: input.products })
                .onConflictDoUpdate({ 
                    target: customer_cart.customerId, 
                    targetWhere: sql`customerId = ${input.customerId}`,
                    set: { products: JSON.stringify(input.products) },
                    setWhere: sql`customerId = ${input.customerId}`
                })
                .returning()

            return {
                status: 200,
                cartItemsByCustomer
            }
        }
    }),
    deleteCartItem: {},
    updateCartItemQuantity: {}
}
