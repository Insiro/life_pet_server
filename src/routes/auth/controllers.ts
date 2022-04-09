import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/users";
import { hash, HttpError } from "../utils";
import { check_duplicate_id } from "./utils";

const sign: RequestHandler = async (req, res, next): Promise<void> => {
  const { body: data } = req;
  try {
    if (!("id" in data && "pwd" in data)) throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY);

    const user = await AppDataSource.manager
      .createQueryBuilder(User, "user")
      .where("user.id = :id", { id: data.id })
      .getOne();
    if (user === null) throw new HttpError(StatusCodes.UNAUTHORIZED);

    const hashed = hash(data.pwd, user.salt);
    if (hashed !== user.certificate) throw new HttpError(StatusCodes.UNAUTHORIZED);

    //TODO: add  JWT
    res.status(StatusCodes.ACCEPTED).send();
  } catch (error) {
    next(error);
  }
};

const availableId: RequestHandler = async (req, res, next): Promise<void> => {
  const { body: data } = req;
  try {
    if (!("id" in data)) throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY);
    const result = await check_duplicate_id(data.id);
    if (result) throw new HttpError(StatusCodes.CONFLICT);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    next(error);
  }
};

const register: RequestHandler = async (req, res, next): Promise<void> => {
  const { body: data } = req;
  try {
    if (
      !(
        "id" in data &&
        "name" in data &&
        "user_name" in data &&
        "email" in data &&
        "call" in data &&
        "pwd" in data
      )
    )
      throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY);
    if (await check_duplicate_id(data.id)) throw new HttpError(StatusCodes.CONFLICT);
    var salt = Math.round(new Date().valueOf() * Math.random()) + "";
    var hashed_pwd = hash(data.pwd, salt);
    AppDataSource.manager
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        user_id: data.id,
        user_name: data.user_name,
        email: data.email,
        call: data.call,
        name: data.name,
        salt: salt,
        certificate: hashed_pwd,
      })
      .execute();
    res.status(StatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
};

export default { sign, register, availableId };
