import {createResponse} from "node-mocks-http";
import { expect } from "chai";
import {StatusCodes} from "http-status-codes";
import {UpdateLocationControllerFixture} from "@tests/account/fixtures/update-location-controller-fixture";
import {UpdateLocationRequestBuilder} from "@tests/account/builders/update-location-request-builder";

describe("UpdateLocationController", () => {
  describe(".updateLocation", () => {
    it("should send NO_CONTENT if onSuccess callback is called", async () => {
      // given
      const { controller } = new UpdateLocationControllerFixture()
      const response = createResponse();
      const request = new UpdateLocationRequestBuilder().build();

      // when
      await controller.updateLocation(response, request);

      // then
      expect(response.statusCode).equal(StatusCodes.NO_CONTENT);
    });
  })
})
