import { Request, Response } from "express";

import * as UserService from "../service/user";

export function getUsers(req: Request, res: Response) {
  res.json({
    message: "Hello users",
  });
}

export function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  const data = UserService.getUserById(id);

  res.json(data);
}

export function createUser(req: Request, res: Response) {
  const { body } = req;

  UserService.createUser(body);

  res.json({
    message: "User created",
  });
}
