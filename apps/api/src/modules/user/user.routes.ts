import type { FastifyInstance } from "fastify";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserControllers } from "./user.controllers.js";
import { clerkClient } from "@clerk/fastify";

export const UserRoutes = async (fastify: FastifyInstance) => {

    const db = fastify.prisma;
    const clerk = clerkClient
    const repo = new UserRepository(db);
    const services = new UserService(repo);
    const controllers = new UserControllers(services, clerk);

    fastify.post(
        '/webhook/clerk',
        {
            config: {
                rawBody: true
            }
        },
        controllers.createWebhook)

}