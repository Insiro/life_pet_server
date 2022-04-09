import { Router } from "express";
import { pet_list } from "./controller";

const userRouter = Router();

//TODO: get User Info
userRouter.get("/:id");
//TODO:Delete User
userRouter.delete("/:id");
//TODO: update User Info
userRouter.patch("/:id");

userRouter.get("/:id/pet", pet_list);

//TODO: habbit for User
userRouter.get("/:id/habbit");
//TODO: Freintds for User
userRouter.get("/:id/friend");
//TODO: Achivement for User
userRouter.get("/:id/achivement");

export { userRouter };
