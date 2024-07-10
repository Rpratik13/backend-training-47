import bcrypt from "bcrypt";

import { User } from "../interfaces/user";

import { getUserByEmail } from "./user";
import { sign } from "jsonwebtoken";
import config from "../config";

export async function login(body: Pick<User, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);

  if (!existingUser) {
    return {
      error: "Invalid email or password",
    };
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    return {
      error: "Invalid email or password",
    };
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    permissions: existingUser.permissions,
  };

  const accessToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
}
