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

// POST Requests
// create new Airport
airportRouter.post("/", async (request: Request, response: Response) => {
  const body = request.body;

  if (!body.name || !body.country || !body.location)
    return response.status(400).end();

  const country = await prisma.country.findFirst({
    where: {
      code: body.country.code,
    },
  });
  const countryId = country?.id;
  if (!countryId) return response.status(400).end();

  const airlinesIDArray = body.airlines.map((airline: any) => {
    return { id: airline.id };
  });

  const newAirport = await prisma.airport.create({
    data: {
      name: body.name,
      location: body.location,
      country: {
        connect: {
          id: countryId,
        },
      },
      airlines: {
        connect: airlinesIDArray,
      },
    },
    include: {
      country: true,
      airlines: true,
    },
  });
  response.send(newAirport);
});

export default airportRouter;
