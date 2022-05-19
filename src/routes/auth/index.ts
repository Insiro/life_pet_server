import { Router } from "express";
import ctl from "./controllers";

const authRouter = Router();

//TODO Ctegory list
authRouter.post("sign", ctl.sign);
authRouter.get("availableId", ctl.availableId);
authRouter.post("register", ctl.register);

export { authRouter };
