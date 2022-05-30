import crypto from "crypto";
import { RequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import AppDataSource from "../data-source";
import { User } from "../entity/users";

export class HttpError {
  errorCode: number;
  msg: string;
  constructor(errorCode: StatusCodes, msg?: string) {
    this.errorCode = errorCode;
    this.msg = msg ? msg : "error with " + errorCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const get_user_404 = async (id: string): Promise<User> => {
  const user = await AppDataSource.manager
    .createQueryBuilder(User, "user")
    .where("user.user_id = :id", { id: id })
    .getOne();
  if (user == null) throw new HttpError(StatusCodes.NOT_FOUND);
  return user;
};
export const hash = (pwd: string, salt: string): string => {
  const hashPassword = crypto
    .createHash("sha512")
    .update(pwd + salt)
    .digest("hex");
  return hashPassword;
};

export const notImplmentied: RequestHandler = (_, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
};
