import cors from "cors";
import express from "express";
import morgan from "morgan";
import airlineRouter from "./controllers/airlines";
import airportRouter from "./controllers/airports";
import countryRouter from "./controllers/countries";
import middleware from "./utils/middleware";

const app = express();

// add loggin middleware
app.use(morgan("tiny"));
// enable CORS
app.use(cors());
// enable bodyParser
app.use(express.json());

// add endpoint middlewares
app.use("/api/airlines", airlineRouter);
app.use("/api/airports", airportRouter);
app.use("/api/countries", countryRouter);

// add error handling middlewares
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandleMiddleware);

export default app;
