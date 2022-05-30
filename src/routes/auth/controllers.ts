import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import AppDataSource from "../../data-source";
import { User } from "../../entity/users";
import { get_user_404, hash, HttpError } from "../../utils";
import { check_duplicate_id } from "./utils";

const sign: RequestHandler = async (req, res, next): Promise<void> => {
  const data = req.body;

  try {
    if (data == null || !("id" in data) || !("pwd" in data))
      throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY);
    const user = await get_user_404(data.id);
    if (!user.passwd_chk(data.pwd)) throw new HttpError(StatusCodes.UNAUTHORIZED);
    const userObj = {
      user_id: user.user_id,
      user_name: user.user_name,
      email: user.email,
      call: user.call,
      nick_name: user.nick_name,
    };
    //TODO: add  JWT
    res.status(StatusCodes.ACCEPTED).json(userObj);
  } catch (error) {
    next(error);
  }
};

const availableId: RequestHandler = async (req, res, next): Promise<void> => {
  const { body: data } = req;
  try {
    if (!("id" in data)) throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY);
    const result = await check_duplicate_id(data.id);
    res.status(200).send(result);
    if (result) throw new HttpError(StatusCodes.CONFLICT);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    try {
      next(error);
    } catch (error) {
      console.log((error as Error).message);
    }
  }
};

const register: RequestHandler = async (req, res, next): Promise<void> => {
  const { body: data } = req;
  try {
    if (
      !(
        "id" in data &&
        "nick_name" in data &&
        "user_name" in data &&
        "email" in data &&
        "call" in data &&
        "pwd" in data
      )
    )
      throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY);
    if (await check_duplicate_id(data.id)) throw new HttpError(StatusCodes.CONFLICT);
    let salt = Math.round(new Date().valueOf() * Math.random()) + "";
    let hashed_pwd = hash(data.pwd, salt);
    AppDataSource.manager
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        user_id: data.id,
        user_name: data.user_name,
        email: data.email,
        call: data.call,
        nick_name: data.nick_name,
        salt: salt,
        certificate: hashed_pwd,
      })
      .execute();
    res.status(StatusCodes.CREATED).send();
  } catch (err) {
    next(err);
  }
};

export default { sign, register, availableId };
