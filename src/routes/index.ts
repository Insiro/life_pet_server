import { Router } from "express";
import { authRouter } from "./auth";
// Init router and path
const router = Router();

router.use("/auth", authRouter);

// Export the base-router
export default router;
