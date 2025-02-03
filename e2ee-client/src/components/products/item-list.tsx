import type { ProductAttrs } from "@/lib/models"
import { actions } from "astro:actions"
import { DIRECTUS_URL } from "astro:env/client"
import { useStore } from "@nanostores/react"

import { $customerCart, $userData } from "@/lib/store"

export { ItemList }

type Attrs = {
    products: ProductAttrs[]
}

function ItemList(props:Attrs) {
    const { products } = props
    const customerCart = useStore($customerCart)
    const userData = useStore($userData)
    
    async function handleAddToCart(item) {
        let items = {
            customerId: userData.id,
            customerEmail: userData.email,
            cartItems: [...customerCart.cartItems, {
                productId: item.product_id,
                title: item.title,
                description: item.description,
                thumbnail: item.main_img,
                price: item.price,
                quantity: "1"
            }]
        }
       
        $customerCart.set(items)
        await actions.addCartItem(items)
    }

    return (
        <div className="flex flex-wrap items-center gap-4">
        {
            products.length && products.map((item, idx) => (
                <Items key={item.product_id} product={item} handleAddToCart={handleAddToCart} />
            ))
        }
        </div>
    )
}

function Items({ product, handleAddToCart }) {
    return (
        <div className="p-4 border w-fit">
            <div className="w-52 h-52 flex justify-center">
                <img src={`${DIRECTUS_URL}/assets/${product.main_img}`} alt={product.title} className="h-48 w-48" />
            </div>
            <div>
                <a className="font-semibold text-sm">
                    { product.title }
                </a>
                <div className="flex justify-between text-sm p-2">
                    <span>
                        $ { (parseFloat(product.price)).toFixed(2) }
                    </span>
                    <button className="border px-2 py-1"
                        onClick={async (ev) => {
                            ev.preventDefault()
                            handleAddToCart(product)
                        }}
                    >
                        add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}
