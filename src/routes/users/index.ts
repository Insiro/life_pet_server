import { Router } from "express";
import * as othCtl from "./controller";
import * as userCtl from "./user_ctl";
const userRouter = Router();

userRouter.get("/:id", userCtl.user_info);

userRouter.delete("/:id", userCtl.detele_user);

userRouter.patch("/:id", userCtl.update_user);

userRouter.get("/:id/pet", othCtl.pet_list);

userRouter.get("/:id/habbit", othCtl.habit_list);

userRouter.get("/:id/friend", othCtl.friend_list);

userRouter.get("/:id/achivement", othCtl.achievment_list);

export default userRouter;
