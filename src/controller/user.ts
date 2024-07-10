import { Request, Response } from "express";

import * as UserService from "../service/user";
import { GetUserQuery } from "../interfaces/user";

import HttpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserController");

export function getUsers(
  req: Request<any, any, any, GetUserQuery>,
  res: Response
) {
  const { query } = req;

  const data = UserService.getUsers(query);

  res.json(data);
}

export function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  logger.info("Called getUserById");

  const data = UserService.getUserById(id);

  res.status(HttpStatusCodes.OK).json(data);
}

export async function createUser(req: Request, res: Response) {
  const { body } = req;

  await UserService.createUser(body);

  res.json({
    message: "User created",
  });
}
