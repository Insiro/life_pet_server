import { Router } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./users";
import { httpErrorHandler } from "./utils";
// Init router and path
const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
// Error hnadling MiddleWare
router.use(httpErrorHandler);

// Export the base-router
export default router;
