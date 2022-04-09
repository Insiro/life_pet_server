import { Router } from "express";
import { authRouter } from "./auth";
import { httpErrorHandler } from "./utils";
// Init router and path
const router = Router();

router.use("/auth", authRouter);
// Error hnadling MiddleWare
router.use(httpErrorHandler);

// Export the base-router
export default router;
