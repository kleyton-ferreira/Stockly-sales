import { db } from "@/app/_lib/prisma";

// FUNÇAO GET - PEGAR PRODUTOS DO BANCO!
export async function GET() {
    const products = await db.product.findMany({})
    return Response.json(products, {
        status: 200
    })
}


// FUNÇAO POST - DE CRIAR PRODUTOS NO BANCO 
export async function POST(request: Request) {
    const body = await request.json()
    const name = body.name
    const price = body.price
    const stock = body.stock
    await db.product.create({
        data: {
            name, price, stock
        }
    })
    return Response.json({}, { status: 201 })
}