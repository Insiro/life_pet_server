import { ErrorRequestHandler } from "express";
import { HttpError } from "../utils";

export const httpErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError)
    res.status(err.errorCode).send(err.msg === undefined ? "" : err.msg);
  else next;
};
