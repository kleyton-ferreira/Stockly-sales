import { PrismaClient } from "@prisma/client";

const createPrismaClient = () => {
    return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
    cachedPrisma: ReturnType<typeof createPrismaClient> | undefined;
};

let prisma: ReturnType<typeof createPrismaClient>;
if (process.env.NODE_ENV === "production") {
    prisma = createPrismaClient();
} else {
    if (!globalForPrisma.cachedPrisma) {
        globalForPrisma.cachedPrisma = createPrismaClient();
    }
    prisma = globalForPrisma.cachedPrisma;
}

export const db = prisma;