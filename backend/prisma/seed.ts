import { PrismaClient } from "@prisma/client";
import { airlines as initialAirlines } from "./airlines";
import { airports as initialAirports } from "./airports";
import { countries } from "./countries";

const prisma = new PrismaClient();

const initialCountries = countries.map((country) => ({
  name: country.name.common,
  code: country.cca3,
}));

const main = async () => {
  // if there are already records - delete them all
  await prisma.airport.deleteMany({});
  await prisma.airline.deleteMany({});
  await prisma.country.deleteMany({});
  // add initial data about countries
  await prisma.country.createMany({
    data: initialCountries,
  });

  const croatia = await prisma.country.findFirst({
    where: { name: "Croatia" },
  });
  const croatiaId = croatia?.id;

  const ireland = await prisma.country.findFirst({
    where: { name: "Ireland" },
  });
  const irelandId = ireland?.id;

  const emirates = await prisma.country.findFirst({
    where: { name: "United Arab Emirates" },
  });
  const emiratesId = emirates?.id;

  // add initial data about airports
  await prisma.airport.create({
    data: {
      ...initialAirports[0],
      country: {
        connect: { id: croatiaId },
      },
    },
    include: {
      country: true,
    },
  });
  await prisma.airport.create({
    data: {
      ...initialAirports[1],
      country: {
        connect: { id: croatiaId },
      },
    },
    include: {
      country: true,
    },
  });
  await prisma.airport.create({
    data: {
      ...initialAirports[2],
      country: {
        connect: { id: croatiaId },
      },
    },
    include: {
      country: true,
    },
  });

  const zagrebAirport = await prisma.airport.findFirst({
    where: { name: "Zračna luka Franjo Tuđman" },
  });
  const splitAirport = await prisma.airport.findFirst({
    where: { name: "Zračna luka Split" },
  });
  const zadarAirport = await prisma.airport.findFirst({
    where: { name: "Zračna luka Zadar" },
  });

  const zagrebAirportId = zagrebAirport?.id;
  const splitAirportId = splitAirport?.id;
  const zadarAirportId = zadarAirport?.id;

  // add initial airlines
  await prisma.airline.create({
    data: {
      ...initialAirlines[0],
      country: {
        connect: { id: croatiaId },
      },
      airports: {
        connect: [{ id: zagrebAirportId }, { id: splitAirportId }],
      },
    },
    include: {
      country: true,
      airports: true,
    },
  });

  await prisma.airline.create({
    data: {
      ...initialAirlines[1],
      country: {
        connect: { id: irelandId },
      },
      airports: {
        connect: [{ id: zagrebAirportId }, { id: splitAirportId }],
      },
    },
    include: {
      country: true,
      airports: true,
    },
  });

  await prisma.airline.create({
    data: {
      ...initialAirlines[2],
      country: {
        connect: { id: emiratesId },
      },
      airports: {
        connect: [{ id: zagrebAirportId }, { id: zadarAirportId }],
      },
    },
    include: {
      country: true,
      airports: true,
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
