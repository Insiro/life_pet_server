import { ReasonPhrases, StatusCodes } from "http-status-codes";
import AppDataSource from "../../data-source";
import { Achievement } from "../../entity/achivement";
import { HttpError } from "../../utils";

export const get_achieve_404 = async (id: string): Promise<Achievement> => {
  const achieve = await AppDataSource.manager
    .createQueryBuilder(Achievement, "user")
    .where("Achievement.id = :id", { id: id })
    .getOne();
  if (achieve == null) throw new HttpError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return achieve;
};
