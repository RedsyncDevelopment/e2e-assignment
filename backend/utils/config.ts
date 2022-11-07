import { PrismaClient } from "@prisma/client";
require("dotenv").config();

const PORT = process.env.PORT;

const PRISMA_DB =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_PRISMA_DB
    : process.env.PRISMA_DB;

export default { PORT, PRISMA_DB };
