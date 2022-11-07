import { Request, Response, Router } from "express";
import prisma from "../utils/prismaClient";

// initialize router
const airportRouter = Router();

// GET Requests
// get all airports with countries and airlines
airportRouter.get("/", async (request: Request, response: Response) => {
  const airports = await prisma.airport.findMany({
    include: {
      airlines: true,
      country: true,
    },
  });
  response.json(airports);
});

export default airportRouter;
