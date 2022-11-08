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

// DELETE Request
// delete single airline

airlineRouter.delete("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  if (!id) response.status(400).end();

  const airlineToDelete = await prisma.airline.findFirst({
    where: {
      id,
    },
  });

  if (!airlineToDelete) {
    response.status(400).end();
  } else {
    await prisma.airline.delete({
      where: {
        id,
      },
    });

    response.status(204).end();
  }
});

// PUT Requests

airlineRouter.put("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const body = request.body;

  if (!body.name || !body.country) return response.status(400).end();

  // find airline which we want to update
  const airlineToUpdate = await prisma.airline.findFirst({
    where: {
      id,
    },
  });

  if (!airlineToUpdate) {
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
    const airportsIDArray = body.airports.map((airport: any) => {
      return { id: airport.id };
    });

    const updatedAirline = await prisma.airline.update({
      where: {
        id: airlineToUpdate.id,
      },
      data: {
        name: body.name,
        country: {
          connect: {
            id: countryId,
          },
        },
        airports: {
          set: [],
          connect: airportsIDArray,
        },
      },
      include: {
        country: true,
        airports: true,
      },
    });

    response.json(updatedAirline);
  }
});

export default airlineRouter;
