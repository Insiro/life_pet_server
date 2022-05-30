import { RequestHandler } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import AppDataSource from "../../data-source";
import { Pet } from "../../entity/pet";
import { get_user_404, hash, HttpError } from "../../utils";
import { get_pet_404 } from "./utils";

export const add_pet: RequestHandler = async (req, res, next) => {
  try {
    let data = req.body;
    if (!("category" in data && "complexity" in data && "user_id" in data)) {
      throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, ReasonPhrases.UNPROCESSABLE_ENTITY);
    }
    let user = await get_user_404(req.body.user_id);
    let pet = new Pet();
    pet.category;
    pet.complexity;
    pet.exp = 0;
    pet.level = 1;
    pet.intimacy = 50;
    pet.owner = user;
    AppDataSource.manager.createQueryBuilder().insert().into(Pet).values(pet);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    next(error);
  }
};

export const pet_info: RequestHandler = async (req, res, next) => {
  try {
    let pet = get_pet_404(req.params.id);
    res.status(StatusCodes.OK).json({ pet: pet });
  } catch (error) {
    next(error);
  }
};

export const del_pet: RequestHandler = async (req, res, next) => {
  try {
    let data = req.body;
    if (!("cert" in data && "user_id" in data))
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    let user = await get_user_404(data.user_id);
    if (user.certificate != hash(data.cert, user.salt))
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);

    const del_query = AppDataSource.manager
      .createQueryBuilder()
      .delete()
      .from(Pet)
      .where("id = :id", { id: req.params.id });
    if (!(await del_query.execute()))
      throw new HttpError(StatusCodes.NOT_MODIFIED, ReasonPhrases.NOT_MODIFIED);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    next(error);
  }
};
export const update_pet: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    if (!("cert" in data && "user_id" in data))
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    const user = await get_user_404(data.user_id);
    if (user.certificate !== hash(data.cert, user.salt))
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);

    const pet = await get_pet_404(req.params.id);
    if ("exp" in data) pet.exp = data.exp;
    if ("level" in data) pet.level = data.level;
    if ("intimacy" in data) pet.intimacy = data.intimacy;
    AppDataSource.manager.save(pet);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    next(error);
  }
};
