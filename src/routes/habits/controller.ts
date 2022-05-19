import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { get_habit_404 } from "./utils";

export const habit_info: RequestHandler = async (req, res, next) => {
  try {
    let habit = await get_habit_404(req.params.id);
    res.status(StatusCodes.OK).json({ habit: habit });
  } catch (error) {
    next(error);
  }
};
export const add_habit: RequestHandler = (req, res, next) => {};
