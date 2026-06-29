"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { CreateProductSchema, createProductSchema } from "./schema"

export const createProduct = async (data: CreateProductSchema) => {
    createProductSchema.parse(data)
    await db.product.upsert({
        where: { id: data.id ?? "" },
        update: data,
        create: data,
    })
    revalidatePath("/product")
}