import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import * as ctl from "./controller";

export const habitRouter = Router();
//TODO Ctegory list
habitRouter.get("/cate");
//TODO Ctegory info
habitRouter.get("/cate/:id");

habitRouter.post("/");
habitRouter.get("/:id", ctl.habit_info);
//TODO: update habit
habitRouter.patch("/:id");
//TODO: del habit
habitRouter.delete("/:id");

habitRouter.all("*", (_, res) => {
  res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});
