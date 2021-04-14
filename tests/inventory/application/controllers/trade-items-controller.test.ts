import {TradeItemsControllerFixture} from "@tests/inventory/fixtures/trade-items-controller-fixture";
import {createResponse} from "node-mocks-http";
import {expect} from "chai";
import {StatusCodes} from "http-status-codes";
import {TradeItemsBodyRequestBuilder} from "@tests/inventory/builders/trade-items-body-request-builder";

describe("TradeItemsController", () => {
  describe(".trade", () => {
    it("should send OK if onSuccess callback is called", async () => {
      // given
      const { controller, commandStub } = new TradeItemsControllerFixture();
      commandStub.withSuccess();

      const response = createResponse();
      const request = new TradeItemsBodyRequestBuilder().build();


      // when
      await controller.trade(response, request);

      // then
      expect(response.statusCode).equal(StatusCodes.NO_CONTENT);
    })
  })
})
