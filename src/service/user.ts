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

  await UserModel.UserModel.create({
    ...user,
    password,
  });
}

export async function updateUser(id: string, user: User) {
  const password = await bcrypt.hash(user.password, 10);

  await UserModel.UserModel.update(id, {
    ...user,
    password,
  });
}

export async function getUsers(query: GetUserQuery) {
  const data = await UserModel.UserModel.getUsers(query);

  const count = await UserModel.UserModel.count(query);

  const meta = {
    page: query.page,
    size: data.length,
    total: +count.count,
  };

  return { data, meta };
}

export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);

  return data;
}
