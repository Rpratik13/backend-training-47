import { User } from "../interfaces/user";
import * as UserModel from "../model/user";

export function getUserById(id: string) {
  const data = UserModel.getUserById(id);

  if (!data) {
    return {
      error: `User with id: ${id} not found`,
    };
  }

  return data;
}

export function createUser(user: User) {
  UserModel.createUser(user);
}
