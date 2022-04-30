import { Router } from "express";
import * as ctl from "./controller";

const userRouter = Router();

//TODO: get User Info
userRouter.get("/:id", ctl.user_info);
userRouter.delete("/:id", ctl.detele_user);
//TODO: update User Info
userRouter.patch("/:id");

userRouter.get("/:id/pet", ctl.pet_list);

//TODO: habbit for User
userRouter.get("/:id/habbit");
//TODO: Freintds for User
userRouter.get("/:id/friend");
//TODO: Achivement for User
userRouter.get("/:id/achivement");

export { userRouter };
