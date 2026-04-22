import type { PrismaClient } from "../../generated/prisma/client.js";
import type { CreateUserDTO } from "./user.types.js";

export class UserRepository {
    constructor(private db: PrismaClient) { }

    upsert = async (clerkId: string, data: CreateUserDTO) => {
        return await this.db.user.upsert({
            where: { clerkId },
            update: {},
            create: data,
        })
    }

    findById = async (id: string) => {
        return await this.db.user.findUnique({ where: { id } })
    }

    findByClerkId = async (clerkId: string) => {
        return await this.db.user.findUnique({ where: { clerkId } })
    }

}