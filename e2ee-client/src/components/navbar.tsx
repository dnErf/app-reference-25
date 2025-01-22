import type { CustomerCartAttrs, UserDataAttrs } from "@/lib/models"

import { useEffect } from "react"

import { $customerCart, $userData } from "@/lib/store"

export { NavbarUser }

type Attrs = {
    userData: UserDataAttrs;
    customerCart?: CustomerCartAttrs;
}

function NavbarUser(props: Attrs) {
    const { customerCart, userData } = props
    
    useEffect(() => {
        $userData.set(userData)
        $customerCart.set(customerCart)
    }, [])
    
    return (
        <div className="flex gap-4">
            <div>
                <a href="/checkout">
                    check out
                </a>
            </div>
            <div>
                { userData.user }
            </div>
            <div>
                <img src={userData.img_thumbnail} height="32px" width="32px" />
            </div>
        </div>
    )
}
