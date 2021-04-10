import { expect } from "chai";
import {CreateAccountController} from "@src/account/application/controllers/create-account-controller";

describe("CreateAccountController", () => {
  describe(".createUser", () => {
    it("should work", async () => {
      const controller = new CreateAccountController();

      const request = {test: 123}

      const response = await controller.createUser(request);

      expect(response).equal(request);
    })
  })
})
