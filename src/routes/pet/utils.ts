import { StatusCodes, ReasonPhrases } from "http-status-codes";
import AppDataSource from "../../data-source";
import { Pet } from "../../entity/pet";
import { HttpError } from "../../utils";

export const get_pet_404 = async (id: string): Promise<Pet> => {
  const pet = await AppDataSource.manager
    .createQueryBuilder(Pet, "user")
    .where("pet.id = :id", { id: id })
    .getOne();
  if (pet == null) throw new HttpError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return pet;
};
