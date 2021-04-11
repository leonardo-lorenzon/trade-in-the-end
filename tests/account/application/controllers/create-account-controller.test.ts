import { expect } from "chai";
import { createResponse } from "node-mocks-http";
import {StatusCodes} from "http-status-codes";

import {CreateAccountControllerFixture} from "@tests/account/fixtures/create-account-controller-fixture";

describe("CreateAccountController", () => {
  describe(".createUser", () => {
    it("should work", async () => {
      const { controller, createAccountCommand } = new CreateAccountControllerFixture();

      const request = {test: 123}

      createAccountCommand.withSuccess(request);

      const response = createResponse();

      await controller.createUser(response, request);

      expect(response.statusCode).equal(StatusCodes.OK);
    })
  })
})
