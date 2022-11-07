import { Request, Response, Router } from "express";
import prisma from "../utils/prismaClient";

// initialize Router
const airlineRouter = Router();

// GET Requests
// get all airlines
airlineRouter.get("/", async (request: Request, response: Response) => {
  const airlines = await prisma.airline.findMany({
    include: {
      airports: true,
      country: true,
    },
  });
  response.json(airlines);
});

// POST Requests
airlineRouter.post("/", async (request: Request, response: Response) => {
  const body = request.body;

  // if there is no name or country - return 400
  if (!body.name || !body.country) return response.status(400).end();

  // else create new Airline

  const country = await prisma.country.findFirst({
    where: { code: body.country.code },
  });
  const countryId = country?.id;

  if (!countryId) return response.status(400).end();

  const newAirline = await prisma.airline.create({
    data: {
      name: body.name,
      country: {
        connect: {
          id: countryId,
        },
      },
    },
    include: {
      airports: true,
      country: true,
    },
  });

  response.json(newAirline);
});

export default airlineRouter;
