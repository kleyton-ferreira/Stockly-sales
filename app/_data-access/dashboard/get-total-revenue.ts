import "server-only"

import { db } from "@/app/_lib/prisma"

export const getTotalRevenue = async (): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const totalRevenueQuery = `
     SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
     FROM "SaleProduct"
     JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
    `
    const totalRevenue = await db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery)

    return totalRevenue[0].totalRevenue
}