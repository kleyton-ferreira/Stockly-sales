"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { createProductSchema } from "./schema"
import { actionClient } from "@/app/_lib/safe-actions"

export const createProduct = actionClient.schema(createProductSchema).action(async ({ parsedInput: { id, ...data } }) => {
    await db.product.upsert({
        where: { id: id ?? "" },
        update: data,
        create: data,
    })
    revalidatePath("/product")
})

