import express from "express";

import authRouter from "./auth";
import userRouter from "./user";
import projectRouter from "./project";

const router = express();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/projects", projectRouter);

export default router;
