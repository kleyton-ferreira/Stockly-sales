import "server-only"

import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";

export type ProductStatus = "IN_STOCK" | "OUT_OF_STOCK"

export interface ProductDto extends Product {
    status: ProductStatus
}

export const getProducts = async (): Promise<ProductDto[]> => {
    const products = await db.product.findMany({})
    return products.map((prod) => ({
        ...prod, status: prod.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK"
    }))
}