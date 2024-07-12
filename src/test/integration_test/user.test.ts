import request from "supertest";

import express from "express";
import router from "../../routes";
import { users } from "../../model/user";

describe("User Integration Test Suite", () => {
  const app = express();

  app.use(express.json());

  app.use(router);

  describe("createUser API Test", () => {
    it("Should create a new user", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          name: "User Integration Test",
          email: "user1@test.com",
          password: "test1234Aa!",
          id: "1",
          permissions: ["users.get"],
        });

      console.log(users);
    });
  });
});
