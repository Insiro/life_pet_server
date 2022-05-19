import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { notImplmentied } from "../../utils";
import * as ctl from "./controller";

export const habitRouter = Router();

habitRouter.post("/", ctl.add_habit);
habitRouter.get("/:id", ctl.habit_info);
//TODO: update habit
habitRouter.patch("/:id", notImplmentied);
//TODO: del habit
habitRouter.delete("/:id", notImplmentied);

habitRouter.all("*", (_, res) => {
  res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});
