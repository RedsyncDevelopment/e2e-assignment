import { Request, Response, Router } from "express";
import prisma from "../utils/prismaClient";

// initialize Router
const airlineRouter = Router();

airlineRouter.get("/", async (request: Request, response: Response) => {
  const airlines = await prisma.airline.findMany({
    include: {
      airports: true,
      country: true,
    },
  });
  response.json(airlines);
});

export default airlineRouter;
