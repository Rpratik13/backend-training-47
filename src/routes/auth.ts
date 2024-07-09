import express from "express";
import { login } from "../controller/auth";

const router = express();

router.post("/login", login);

export default router;
