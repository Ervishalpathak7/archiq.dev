import type { UserRepository } from "./user.repository.js";
import type { CreateUserDTO } from "./user.types.js";


export class UserService {
    constructor(private repository: UserRepository) { }

    upsertUser = async (clerkId: string, data: CreateUserDTO) => {
        return await this.repository.upsert(clerkId, data);
    }

    getUserById = async (id: string) => {
        return await this.repository.findById(id);
    }

    getUserByClerkId = async (clerkId: string) => {
        return await this.repository.findByClerkId(clerkId);
    }
}