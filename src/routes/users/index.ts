import { Router } from "express";
import * as oth_ctl from "./controller";
import * as user_ctl from "./user_ctl";
const userRouter = Router();

userRouter.get("/:id", user_ctl.user_info);

userRouter.delete("/:id", user_ctl.detele_user);

userRouter.patch("/:id", user_ctl.update_user);

userRouter.get("/:id/pet", oth_ctl.pet_list);

userRouter.get("/:id/habbit", oth_ctl.habit_list);

userRouter.get("/:id/friend", oth_ctl.friend_list);

userRouter.get("/:id/achivement", oth_ctl.achievment_list);

export { userRouter };
