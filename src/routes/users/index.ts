import { Router } from "express";
import { pet_list } from "./controller";

const userRouter = Router();


userRouter.get("/:id/pet", pet_list);
userRouter.use("/:id/habbit");
userRouter.use("/:id/friend");
userRouter.use("/:id/achivement");
userRouter.use("/:id/habbit");

export { userRouter };
