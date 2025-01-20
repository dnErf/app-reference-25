import { atom } from "nanostores"

import type { CartItemAttrs, UserDataAttrs } from "./models"

export const $userData = atom<UserDataAttrs>({
    id: "",
    email: "",
    user: "",
    thumbnail: ""
})

export const $cartItems = atom<CartItemAttrs>({
    customerId: "",
    products: []
})

// export const addToCart = (item: CartItem) => {
//     $cartItems.set([...$cartItems.get(), item])
// }
