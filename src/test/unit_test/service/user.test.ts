import { add, createUser, getUserById } from "../../../service/user";

import sinon from "sinon";
import expect from "expect";
import bcrypt from "bcrypt";
import * as UserModel from "../../../model/user";
import { BadRequestError } from "../../../error/BadRequestError";

describe("User Service Test Suite", () => {
  describe("add", () => {
    it("Should return the sum of two numbers", () => {
      const output = add(1, 2);

      expect(output).toBe(3);
    });
  });

  describe("getUserById", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });

    it("Should throw error when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);

      expect(() => getUserById("100")).toThrow(
        new BadRequestError("User with id: 100 not found")
      );
    });

    it("Should return user if user is found", () => {
      const user = {
        id: "1",
        name: "Test",
        email: "test@test.com",
        password: "test1234",
        permissions: [],
      };

      userModelGetUserByIdStub.returns(user);

      const response = getUserById("1");

      expect(response).toStrictEqual(user);
    });
  });

  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let userModelCreateUserStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      userModelCreateUserStub = sinon.stub(UserModel, "createUser");
    });

    afterEach(() => {
      bcryptHashStub.restore();
      userModelCreateUserStub.restore();
    });

    it("Should create new user", async () => {
      bcryptHashStub.resolves("hashedPassword");

      const user = {
        id: "1",
        name: "Test",
        email: "test@test.com",
        password: "test1234",
        permissions: [],
      };

      await createUser(user);

      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);

      expect(userModelCreateUserStub.callCount).toBe(1);
      expect(userModelCreateUserStub.getCall(0).args).toStrictEqual([
        {
          ...user,
          password: "hashedPassword",
        },
      ]);
    });
  });
});
