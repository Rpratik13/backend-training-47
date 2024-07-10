import { GetUserQuery, User } from "../interfaces/user";

const users: User[] = [
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
