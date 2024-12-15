type ProductEntity = {
    id: number;
    seller_id: string;
    title: string;
    description: string | null;
    category: string;
    main_media: string;
    status: string;
    price: string;
    quantity: number;
    date_updated: string | null;
    date_created: string;
}

type ResultData<T> = {
    data: T[];
}

import { DIRECTUS_BEARER } from "astro:env/server"
const BEARER = import.meta.env.DIRECTUS_BEARER ?? DIRECTUS_BEARER ?? process.env.DIRECTUS_BEARER;

function getProductData(): Promise<ProductEntity[] | void> {
    return fetch('https://directus.vbx.frend.pw/items/e2ee_products', {
        headers: {
            Authorization: `Bearer ${BEARER}`,
            Accept: 'application/json',
        }
    })
    .then((response) => response.json())
    .then((jsn:ResultData<ProductEntity>) => jsn.data)
    .catch((err) => console.error(err))
}

export const productAction = {
    getProductData
}
