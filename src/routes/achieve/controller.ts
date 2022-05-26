import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import AppDataSource from "../../data-source";
import { AchievementCategory } from "../../entity/achivementCategory";
import { get_achieve_404 } from "./utils";

export const get_cate: RequestHandler = async (_, res) => {
  let cates = await AppDataSource.manager
    .createQueryBuilder()
    .from(AchievementCategory, "cate")
    .getMany();
  res.status(StatusCodes.OK).json({ cates: cates });
};

export const get_achieve: RequestHandler = async (req, res, next) => {
  try {
    let achieve = await get_achieve_404(req.params.id);
    res.status(StatusCodes.OK).json({ achieve: achieve });
  } catch (error) {
    next(error);
  }
};
