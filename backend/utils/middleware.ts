import { NextFunction, Request, Response } from "express";

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

const errorHandleMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  next(error);
};

export default { unknownEndpoint, errorHandleMiddleware };
