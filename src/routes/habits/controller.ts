import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../data-source";
import { Habbit } from "../../entity/habbits";
import { get_user_404, HttpError } from "../../utils";
import { get_habit_404 } from "./utils";

export const habit_info: RequestHandler = async (req, res, next) => {
  try {
    let habit = await get_habit_404(req.params.id);
    res.status(StatusCodes.OK).json({ habit: habit });
  } catch (error) {
    next(error);
  }
};
export const add_habit: RequestHandler = async (req, res, next) => {
  try {
    let data = req.body;
    if (
      !(
        "targget" in data &&
        "achieve" in data &&
        "desc" in data &&
        "date" in data &&
        "user_id" in data
      )
    )
      throw new HttpError(StatusCodes.NOT_ACCEPTABLE);
    let user = await get_user_404(data.user_id);
    let habit = new Habbit();
    habit.target = data.target;
    habit.achieve = data.achieve;
    habit.desc = data.desc;
    habit.date = data.date;
    habit.user = user;
    let query = AppDataSource.createQueryBuilder().insert().into(Habbit).values(habit);
    if (!(await query.execute())) throw new HttpError(StatusCodes.EXPECTATION_FAILED);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    next(error);
  }
};
