import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import config from "../config";
import { User } from "../interfaces/user";
import { Request } from "../interfaces/auth";
import { UnauthenticatedError } from "../error/UnauthenticatedError";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Token not found"));

    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Unauthenticated"));

    return;
  }

  try {
    const user = verify(token[1], config.jwt.secret!) as User;

    req.user = user;
  } catch (error) {
    next(new UnauthenticatedError("Unauthenticated"));
  }

  next();
}

export function authorize(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    if (!user.permissions.includes(permission)) {
      next(new Error("Forbidden"));
    }

    next();
  };
}
