import { atom } from "nanostores"

import type { CartItemAttrs, CustomerCartAttrs, UserDataAttrs } from "./models"

export const $userData = atom<UserDataAttrs>({
    id: "",
    email: "",
    user: "",
    img_thumbnail: ""
})

// export const $cartItems = atom<CartItemAttrs>({
//     customerId: "",
//     products: []
// })

export const $customerCart = atom<CustomerCartAttrs>({
    customerId: "",
    cartItems: []
})

// export const addToCart = (item: CartItem) => {
//     $cartItems.set([...$cartItems.get(), item])
// }
