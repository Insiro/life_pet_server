import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import * as ctl from "./controller";

export const petRouter = Router();

petRouter.post("/", ctl.add_pet);
petRouter.get("/:id", ctl.pet_info);
petRouter.patch("/:id", ctl.update_pet);
petRouter.delete("/:id", ctl.del_pet);

petRouter.all("*", (_, res) => {
  res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});
