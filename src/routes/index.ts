import { Router } from "express";
import { authRouter } from "./auth";
import { petRouter } from "./pet";
import { userRouter } from "./users";
import { habitRouter } from "./habits";
// Init router and path
const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/pet", petRouter);
router.use("/habit", habitRouter);
// Export the base-router
export default router;
