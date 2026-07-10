import "server-only"

import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";

export interface ProductDto extends Product {
    status: "IN_STOCK" | "OUT_OF_STOCK";
}

export const getProducts = async (): Promise<ProductDto[]> => {
    const products = await db.product.findMany({})
    return products.map((prod) => ({
        ...prod, status: prod.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK"
    }))
}