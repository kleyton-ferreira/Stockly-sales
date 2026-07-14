import "server-only"

import { db } from "@/app/_lib/prisma"
import { Prisma } from "@prisma/client"

interface SaleProductDto {
    productId: string
    quantity: number
    unitPrice: number
    productName: string
}

export interface SalesDto {
    id: string
    productNames: string
    totalProducts: number
    totalAmount: number
    date: Date
    saleProduct: SaleProductDto[]
}

type SaleWithProducts = Prisma.SaleGetPayload<{
    include: {
        products: {
            include: { product: true }
        }
    }
}>

export const getSales = async (): Promise<SalesDto[]> => {
    const sales: SaleWithProducts[] = await db.sale.findMany({
        include: {
            products: {
                include: { product: true }
            }
        }
    })

    return sales.map((sale): SalesDto => ({
        id: sale.id,
        date: sale.date,
        productNames: sale.products.map((salesPproducts) => salesPproducts.product.name).join(" • "),
        totalAmount: sale.products.reduce(
            (acc: number, saleProduct) => acc + saleProduct.quantity * Number(saleProduct.unitPrice),
            0
        ),
        totalProducts: sale.products.reduce(
            (acc: number, saleProduct) => acc + saleProduct.quantity,
            0
        ),
        saleProduct: sale.products.map((saleProd): SaleProductDto => ({
            productId: saleProd.productId,
            productName: saleProd.product.name,
            quantity: saleProd.quantity,
            unitPrice: Number(saleProd.unitPrice)
        }))
    }))
}