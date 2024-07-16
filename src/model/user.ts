import { GetUserQuery, User } from "../interfaces/user";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {
  static async create(user: User) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    await this.queryBuilder().insert(userToCreate).table("users");
  }

  static async update(id: string, user: User) {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: new Date(),
    };

    const query = this.queryBuilder()
      .update(userToUpdate)
      .table("users")
      .where({ id });

    console.log(query.toString());

    await query;
  }

  static getUsers(filter: GetUserQuery) {
    const { q } = filter;

    const query = this.queryBuilder()
      .select("id", "name", "email")
      .table("users")
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);

    if (q) {
      query.whereLike("name", `%${q}%`);
    }

    return query;
  }

  static count(filter: GetUserQuery) {
    const { q } = filter;

    const query = this.queryBuilder().count("*").table("users").first();

    if (q) {
      query.whereLike("name", `%${q}%`);
    }

    return query;
  }
}

export const users: User[] = [
  {
    name: "User 1",
    email: "user1@test.com",
    password: "$2b$10$MaHbU9Fp4HKtMqF.vNZ94./M.UJjbYd3McHeXa1bzGdg5MbHq3zsm",
    id: "1",
    permissions: ["users.get"],
  },
];

export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

export function createUser(user: User) {
  return users.push({
    ...user,
    id: `${users.length + 1}`,
  });
}

export function getUsers(query: GetUserQuery) {
  const { q } = query;

  if (q) {
    return users.filter(({ name }) => name.includes(q));
  }

  return users;
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}
