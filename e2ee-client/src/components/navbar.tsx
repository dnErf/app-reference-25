import type { UserDataAttrs } from "@/lib/models"

import { useEffect } from "react"

import { $userData } from "@/lib/store"

export { NavbarUser }

function NavbarUser(props: UserDataAttrs) {
    const { id, email, user, thumbnail } = props
    
    useEffect(() => {
        $userData.set({ id, email, user, thumbnail })
    }, [])
    
    return (
        <div className="flex gap-4">
            <div>
                { user }
            </div>
            <div>
                <img src={thumbnail} height="32px" width="32px" />
            </div>
        </div>
    )
}