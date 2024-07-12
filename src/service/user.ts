import bcrypt from "bcrypt";

import { GetUserQuery, User } from "../interfaces/user";
import * as UserModel from "../model/user";
import { BadRequestError } from "../error/BadRequestError";

export function add(a: number, b: number) {
  return a + b;
}

export function getUserById(id: string) {
  const data = UserModel.getUserById(id);

  if (!data) {
    throw new BadRequestError(`User with id: ${id} not found`);
  }

  return data;
}

export async function createUser(user: User) {
  const password = await bcrypt.hash(user.password, 10);

  UserModel.createUser({
    ...user,
    password,
  });
}

export function getUsers(query: GetUserQuery) {
  return UserModel.getUsers(query);
}

export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);

  return data;
}
