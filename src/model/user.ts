import { User } from "../interfaces/user";

const users = [
  {
    id: "1",
    name: "User 1",
  },
  {
    id: "2",
    name: "User 2",
  },
];

export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

export function createUser(user: User) {
  return users.push({
    id: `${users.length + 1}`,
    ...user,
  });
}
