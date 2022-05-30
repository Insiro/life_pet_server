import { ErrorRequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { HttpError } from "../utils";

// eslint-disable-next-line no-unused-vars
export const httpErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) res.status(err.errorCode).send(err.msg);
  else res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
};
