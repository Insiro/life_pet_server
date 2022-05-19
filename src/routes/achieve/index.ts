import { Router } from "express";
import { notImplmentied } from "../../utils";
import * as ctl from "./controller";

export const achieveRouter = Router();

achieveRouter.get("/:id", ctl.get_achieve);

achieveRouter.get("/cate", ctl.get_cate);
achieveRouter.get("/cate/:id", notImplmentied);

export default achieveRouter;
