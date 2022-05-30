import { RequestHandler, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import AppDataSource from "../../data-source";
import { User } from "../../entity/users";
import { get_user_404, hash, HttpError } from "../../utils";
import { isAvaiableId } from "./utils";

const sign: RequestHandler = async (req, res, next): Promise<void> => {
  const data = req.body;

  try {
    if (data == null || !("id" in data) || !("pwd" in data))
      throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, ReasonPhrases.UNPROCESSABLE_ENTITY);
    let user: User;
    try {
      user = await get_user_404(data.id);
    } catch (error) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }
    if (!user.passwd_chk(data.pwd))
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);

    const userObj = {
      user_id: data.id,
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

const availableId: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
  const query = req.query;
  try {
    if (!("id" in query))
      throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, ReasonPhrases.UNPROCESSABLE_ENTITY);
    const result = await isAvaiableId(query.id as string);
    res.status(StatusCodes.OK).json({ usable: result });
  } catch (error) {
    next(error);
  }
};

const register: RequestHandler = async (req, res, next: NextFunction): Promise<void> => {
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
      throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, ReasonPhrases.UNPROCESSABLE_ENTITY);
    if (!(await isAvaiableId(data.id))) {
      throw new HttpError(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT);
    }
    let salt = Math.round(new Date().valueOf() * Math.random()) + "";
    let hashed_pwd = hash(data.pwd, salt);
    let user = new User();
    user.user_id = data.id;
    user.user_name = data.user_name;
    user.email = data.email;
    user.call = data.call;
    user.nick_name = data.nick_name;
    user.salt = salt;
    user.certificate = hashed_pwd;
    AppDataSource.manager.save(user);
    res.status(StatusCodes.CREATED).send("success");
  } catch (err) {
    next(err);
  }
};

export default { sign, register, availableId };
