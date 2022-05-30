import { StatusCodes, ReasonPhrases } from "http-status-codes";
import AppDataSource from "../../data-source";
import { Habbit } from "../../entity/habbits";
import { HttpError } from "../../utils";

export const get_habit_404 = async (id: string): Promise<Habbit> => {
  const habbit = await AppDataSource.manager
    .createQueryBuilder(Habbit, "user")
    .where("pet.id = :id", { id: id })
    .getOne();
  if (habbit == null) throw new HttpError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return habbit;
};
