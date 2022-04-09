import { Router } from "express";

export const petRouter = Router();

//TODO: New Pet
petRouter.post("/");
//TODO: Get Pet Info
petRouter.get("/:id");
//TODO: Edit Pet
petRouter.patch("/:id");
//TODO: Delete Pet
petRouter.delete("/:id");
