import { Router, Request, Response } from "express";
import ctl from "./controllers";

const authRouter = Router();

authRouter.post("sign", ctl.sign);
authRouter.get("availableId", ctl.availableId);
authRouter.post("register", ctl.register);

export { authRouter };
