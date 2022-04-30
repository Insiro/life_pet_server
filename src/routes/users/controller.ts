import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../data-source";
import { Pet } from "../../entity/pet";
import { User } from "../../entity/users";
import { HttpError, get_user_404 } from "../../utils";

export const pet_list: RequestHandler = async (req, res) => {
  const { id: user_id } = req.params;
  let pets = await AppDataSource.manager
    .createQueryBuilder(Pet, "pet")
    .where("pet.id = :=user_id", { user_id })
    .getMany();
  let pet_id_list: String[] = [];
  pets.forEach((pet) => {
    pet_id_list.push(pet.id);
  });

  res.status(StatusCodes.OK).json({ pets: pet_id_list });
};

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
  } catch (error) {}
};
