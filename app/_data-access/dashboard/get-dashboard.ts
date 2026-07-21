import "server-only"

import { db } from "@/app/_lib/prisma"
import dayjs from "dayjs"

export interface DayTotalRevenue {
    day: string
    totalRevenue: number
}

interface DashboardDto {
    totalRevenue: number
    todayRevenue: number
    totalSales: number
    totalStock: number
    totalProducts: number
    totalLast14DaysRevenue: DayTotalRevenue[]
}

export const getDashboard = async (): Promise<DashboardDto> => {
    // NOVA FUNÇAO DO GRAFICO
    const today = dayjs().endOf("day").toDate()
    const last14Day = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((day) => {
        return dayjs(today).subtract(day, "day")
    })

    const totalLast14DaysRevenue: DayTotalRevenue[] = []
    for (const day of last14Day) {
        const dayTotalRevenue = await db.$queryRawUnsafe<{ totalRevenue: number }[]>(
            `
        SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
        FROM "SaleProduct"
        JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
        WHERE "Sale"."date" > $1 AND "Sale"."date" < $2
        `,
            day.startOf("day").toDate(),
            day.endOf("day").toDate()
        )

        totalLast14DaysRevenue.push({
            day: day.format("DD/MM"),
            totalRevenue: dayTotalRevenue[0].totalRevenue
        })
    }
    // END FUNCTION

    const totalRevenueQuery = `
     SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
     FROM "SaleProduct"
     JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
    `

    const todayRevenueQuery = `
     SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "todayRevenue"
     FROM "SaleProduct"
     JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
     WHERE "Sale"."date" > $1 AND "Sale"."date" < $2
    `

    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

    const totalRevenuePromise = db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery)
    const todayRevenuePromise = db.$queryRawUnsafe<{ todayRevenue: number }[]>(todayRevenueQuery, startOfDay, endOfDay)

    const totalSalesPromise = db.sale.count()

    const totalStockPromise = db.product.aggregate({
        _sum: {
            stock: true
        },
    })

    const totalProductsPromise = db.product.count()

    const [totalRevenue, todayRevenue, totalSales, totalStock, totalProducts] = await Promise.all([
        totalRevenuePromise,
        todayRevenuePromise,
        totalSalesPromise,
        totalStockPromise,
        totalProductsPromise
    ])

    return {
        totalRevenue: Number(totalRevenue[0].totalRevenue),
        todayRevenue: Number(todayRevenue[0].todayRevenue),
        totalSales,
        totalStock: Number(totalStock._sum.stock),
        totalProducts,
        totalLast14DaysRevenue
    }
}