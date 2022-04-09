import crypto from "crypto";
import { ErrorRequestHandler, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
export function hash(pwd: string, salt: string): string {
  var hashPassword = crypto
    .createHash("sha512")
    .update(pwd + salt)
    .digest("hex");
  return hashPassword;
}

export class HttpError extends Error {
  errorCode: number;
  msg?: any;
  constructor(errorCode: StatusCodes, msg?: any, ...args: any) {
    super(...args);
    this.errorCode = errorCode;
    this.msg = msg;
  }
}
export const httpErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError)
    res.status(err.errorCode).send(err.msg === undefined ? "" : err.msg);
};
