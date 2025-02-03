import { db, customer_cart, sql } from "astro:db"
import { defineAction, ActionError } from "astro:actions"
import { E2EE_SERVER, STRIPE_SECRET_KEY } from "astro:env/server"
import Stripe from "stripe"

import { CustomerCart, SalesOrder } from "@/lib/models"

export const cartActions = {
    addCartItem: defineAction({
        accept: "json",
        input: CustomerCart,
        handler: async (input, ctx) => {
            const cartItemsByCustomer = await db
                .insert(customer_cart)
                .values({ customerId: input.customerId, customerEmail: input.customerEmail, cartItems: input.cartItems })
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
        handler: async (input, ctx) => {
            let forSaleItems = input.items.map((item, idx) => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.title,
                            metadata: {
                                order: item.orderId,
                                product: item.productId
                            }
                        },
                        unit_amount: item.price * 100,  
                    },
                    quantity: item.quantity
                }
            })

            const stripe = new Stripe(STRIPE_SECRET_KEY)
            const stripeSession = await stripe.checkout.sessions.create({
                mode: "payment",
                success_url: "http://localhost:4321/checkout/complete?session_id={CHECKOUT_SESSION_ID}",
                line_items: forSaleItems,
                customer_email: input.customerEmail,
                metadata: {
                    oid: input.orderId
                }
            })

            if (!stripeSession) {
                throw new ActionError({
                    code: "BAD_REQUEST",
                    message: ""
                })
            }

            const responseData = await fetch(`${E2EE_SERVER}/api/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            })

            // TODO if not 200 | try and catch
            
            return {
                success: true,
                stripeSessionUrl: stripeSession.url
            }
        }
    }),
    deleteCartItem: {},
    updateCartItemQuantity: {}
}
