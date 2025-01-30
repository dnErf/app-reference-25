import { useEffect, useState } from "react"
import { useStore } from "@nanostores/react"
import { actions } from "astro:actions"
import { nanoid } from "nanoid"

import { $customerCart, $userData } from "@/lib/store"

export { ItemList }

function ItemList() {
    const { customerId, cartItems } = useStore($customerCart)
    const [ totalPrice, setTotalPrice ] = useState(0.00)

    useEffect(() => {
        setTotalPrice(0)
        cartItems.forEach((item) => {
            setTotalPrice(p => p + parseFloat(item.price)) 
        })
    }, [])

    return (
        <div className="flex gap-4">
            <div className="w-full">
                <ul className="">
                {
                    cartItems.map((item, idx) => (
                        <li key={idx} className="border p-4">
                            <div className="flex justify-between">
                                <div>
                                    <div>
                                        { item.title }
                                    </div>
                                    <small>
                                        { item.description }
                                    </small>
                                </div>
                                <div>
                                    $ { parseFloat(item.price) }
                                </div>
                            </div>
                        </li>
                    ))
                } 
                </ul>
                <div className="border flex items-center justify-end font-semibold px-2 py-4">
                    <span className="text-sm">Total Price : $ </span> 
                    <span className="">{ totalPrice }</span>
                </div>
            </div>
            
            <div className="border p-4 w-1/3">
                payment
                <button className="border px-2 py-1"
                    onClick={async (ev) => {
                        ev.preventDefault()
                        const orderId = nanoid(8)
                        const salesItems = cartItems.map((item) => ({
                            id: nanoid(8),
                            orderId: orderId,
                            productId: item.productId,
                            price: parseFloat(item.price),
                            quantity: parseInt(item.quantity),
                        }))
                        
                        // * discount somewhere here

                        const salesOrder = {
                            orderId: orderId,
                            customerId: customerId,
                            paymentId: "",
                            items: salesItems,
                            totalAmount: totalPrice,
                            status: "ordered"
                        }

                        // checkout
                        const resultData = await actions.checkOutCart(salesOrder)
                        console.log(resultData)
                    }}
                >
                    confirm purchase
                </button>
            </div>
        </div>
    )
}
