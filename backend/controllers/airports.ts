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

// DELETE Requests

airportRouter.delete("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  if (!id) response.status(400).end();

  const airportToDelete = await prisma.airport.findFirst({
    where: {
      id,
    },
  });

  if (!airportToDelete) {
    response.status(400).end();
  } else {
    await prisma.airport.delete({
      where: {
        id,
      },
    });

    response.status(204).end();
  }
});

// PUT Requests

airportRouter.put("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const body = request.body;

  if (!body.name || !body.country || !body.location)
    return response.status(400).end();

  // find airport which we want to update
  const airportToUpdate = await prisma.airport.findFirst({
    where: {
      id,
    },
  });

  if (!airportToUpdate) {
    response.status(400).end();
  } else {
    // find country and country ID
    const country = await prisma.country.findFirst({
      where: {
        code: body.country.code,
      },
    });
    const countryId = country?.id;
    if (!countryId) return response.status(400).end();

    // create new airlines array from updated airlines
    const airlinesIDArray = body.airlines.map((airline: any) => {
      return { id: airline.id };
    });

    const updatedAirport = await prisma.airport.update({
      where: {
        id: airportToUpdate.id,
      },
      data: {
        name: body.name,
        location: body.location,
        country: {
          connect: {
            id: countryId,
          },
        },
        airlines: {
          set: [],
          connect: airlinesIDArray,
        },
      },
      include: {
        country: true,
        airlines: true,
      },
    });

    response.json(updatedAirport);
  }
});

export default airportRouter;
