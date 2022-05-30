import { RequestHandler } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import AppDataSource from "../../data-source";
import { User } from "../../entity/users";
import { HttpError, get_user_404, hash } from "../../utils";

export const detele_user: RequestHandler = async (req, res, next) => {
  try {
    const user = await get_user_404(req.params.id);
    if (!("passwd" in req.body))
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    else if (!user.passwd_chk(req.body)) throw new HttpError(StatusCodes.UNAUTHORIZED);

    const delete_query = AppDataSource.manager
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id =:id", { id: user.user_id });
    if (!(await delete_query.execute()))
      throw new HttpError(StatusCodes.NOT_MODIFIED, ReasonPhrases.NOT_FOUND);
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
    let data = req.body;
    if (!("cert" in data))
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    const user = await get_user_404(req.params.id);
    if (hash(data.cert, user.salt) != user.certificate)
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);

    if ("email" in data) user.email = data.email;
    if ("user_name" in data) user.user_name = data.user_name;
    if ("nick_name" in data) user.nick_name = data.nick_name;
    if ("call" in data) user.call = data.call;
    if ("new_cert" in data) user.certificate = hash(data.new_cert, user.salt);
    AppDataSource.manager.save(User, user);
    res.status(StatusCodes.ACCEPTED).send();
  } catch (error) {
    next(error);
  }
};
