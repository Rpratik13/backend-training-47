import express from "express";

import { authenticate, authorize } from "../middlewares/auth";

import { createUser, getUserById, getUsers } from "../controller/user";

const router = express();

router.get("/", authenticate, authorize("users.get"), getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", (req, res) => {
  res.json({
    message: "User updated",
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: "User deleted",
  });
});

export default router;
