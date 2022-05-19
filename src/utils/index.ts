import crypto from "crypto";
import { RequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AppDataSource } from "../data-source";
import { User } from "../entity/users";

export class HttpError extends Error {
  errorCode: number;
  msg?: any;
  constructor(errorCode: StatusCodes, msg?: any, ...args: any) {
    super(...args);
    this.errorCode = errorCode;
    this.msg = msg;
  }
}

export const get_user_404 = async (id: string): Promise<User> => {
  const user = await AppDataSource.manager
    .createQueryBuilder(User, "user")
    .where("user.id = :id", { id: id })
    .getOne();
  if (user == null) throw new HttpError(StatusCodes.NOT_FOUND);
  return user;
};
export const hash = (pwd: string, salt: string): string => {
  let hashPassword = crypto
    .createHash("sha512")
    .update(pwd + salt)
    .digest("hex");
  return hashPassword;
};

export const notImplmentied: RequestHandler = (_, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
};
