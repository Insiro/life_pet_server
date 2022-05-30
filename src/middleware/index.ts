import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../utils";

export const httpErrorHandler: ErrorRequestHandler = (err, _, res) => {
  if (err instanceof HttpError) res.status(err.errorCode).send(err.msg);
  else res.status(StatusCodes.IM_A_TEAPOT).send("teapot");
};
