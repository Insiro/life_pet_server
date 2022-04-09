import { Router, Request, Response } from "express";
import { User } from "../entity/users";
import { AppDataSource } from "../data-source";
import { hash } from "./utils";
export const authRouter = Router();

authRouter.post("sign", async (res: Response, req: Request): Promise<void> => {
  const { body: data } = req;
  try {
    if (!("id" in data && "pwd" in data)) throw new Error("Wrong Feilds");
    const user = await AppDataSource.manager
      .createQueryBuilder(User, "user")
      .where("user.id = :id", { id: data.id })
      .getOne();
    if (user === null) throw new Error("Auth Failed");
    const hashed = hash(data.pwd, user.salt);
    if (hashed !== user.certificate) throw new Error("Auth Failed");
    //TODO: add  JWT
    res.status(200).send();
  } catch (error) {
    res.status(401).send();
  }
});
