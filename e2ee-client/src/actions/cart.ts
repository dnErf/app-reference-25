import { db, customer_cart, sql } from "astro:db"
import { defineAction } from "astro:actions"

import { CustomerCart, SalesOrder } from "@/lib/models"

export const cartActions = {
    addCartItem: defineAction({
        accept: "json",
        input: CustomerCart,
        handler: async (input, ctx) => {
            const cartItemsByCustomer = await db
                .insert(customer_cart)
                .values({ customerId: input.customerId, cartItems: input.cartItems })
                .onConflictDoUpdate({ 
                    target: customer_cart.customerId, 
                    targetWhere: sql`customerId = ${input.customerId}`,
                    set: { cartItems: JSON.stringify(input.cartItems) },
                    setWhere: sql`customerId = ${input.customerId}`
                })
                .returning()

            return {
                status: 200,
                cartItemsByCustomer
            }
        }
    }),
    checkOutCart: defineAction({
        accept: "json",
        input: SalesOrder,
        handler: (input, ctx) => {
            console.log(input)
        }
    }),
    deleteCartItem: {},
    updateCartItemQuantity: {}
}
