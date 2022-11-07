import { Request, Response, Router } from "express";
import prisma from "../utils/prismaClient";

// initialize router
const countryRouter = Router();

// GET Requests
// get all countries
countryRouter.get("/", async (request: Request, response: Response) => {
  const countries = await prisma.country.findMany({});
  response.json(countries);
});

export default countryRouter;
