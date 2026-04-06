import type { FastifyInstance } from "fastify";

const gracefullShutdown = async (app: FastifyInstance) => {
  try {
    await app.close();
    console.log("Server Shutdown Gracefully");
    process.exit(0);
  } catch (error) {
    console.error("Error while gracefull shutdown : ", error);
    process.exit(1);
  }
};

export default gracefullShutdown;
