import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/users";
import { HttpError, get_user_404, hash } from "../../utils";

export const detele_user: RequestHandler = async (req, res, next) => {
  try {
    const user = await get_user_404(req.params.id);
    if (!("passwd" in req.body)) throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY);
    else if (!user.passwd_chk(req.body)) throw new HttpError(StatusCodes.UNAUTHORIZED);

    const delete_query = AppDataSource.manager.createQueryBuilder(User, "user").delete();
    if (!(await delete_query.execute())) throw new HttpError(StatusCodes.NOT_MODIFIED);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    next(error);
  }
};

export const user_info: RequestHandler = async (req, res, next) => {
  try {
    const user = await get_user_404(req.params.id);
    const obj = {
      id: user.user_id,
      nick_name: user.nick_name,
    };
    res.status(StatusCodes.ACCEPTED).json(obj);
  } catch (error) {
    next(error);
  }
};

export const update_user: RequestHandler = async (req, res, next) => {
  try {
    const user = await get_user_404(req.params.id);
    let data = req.body;
    if ("email" in data) user.email = data.email;
    if ("user_name" in data) user.user_name = data.user_name;
    if ("nick_name" in data) user.nick_name = data.nick_name;
    if ("call" in data) user.call = data.call;
    if ("cert" in data) user.certificate = hash(data.cert, user.salt);
    AppDataSource.manager.save(User, user);
  } catch (error) {
    next(error);
  }
};
