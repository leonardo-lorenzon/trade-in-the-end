import { expect } from "chai";
import { createResponse } from "node-mocks-http";
import {StatusCodes} from "http-status-codes";

import {CreateAccountControllerFixture} from "@tests/account/fixtures/create-account-controller-fixture";
import {CreateAccountRequestBuilder} from "@tests/account/builders/create-account-request-builder";

describe("CreateAccountController", () => {
  describe(".createUser", () => {
    it("should send OK if onSuccess callback is called", async () => {
      // given
      const { controller, createAccountCommand } = new CreateAccountControllerFixture();

      const request = new CreateAccountRequestBuilder().build()

      createAccountCommand.withSuccess(request.buildAccount());

      const response = createResponse();

      // when
      await controller.createUser(response, request);

      // then
      expect(response.statusCode).equal(StatusCodes.OK);
    })
  })
})
