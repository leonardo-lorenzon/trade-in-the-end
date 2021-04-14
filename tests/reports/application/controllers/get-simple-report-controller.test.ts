import {GetSimpleReportControllerFixture} from "@tests/reports/fixtures/get-simple-report-controller-fixture";
import { expect } from "chai";
import {createResponse} from "node-mocks-http";
import {StatusCodes} from "http-status-codes";

describe("GetSimpleReportController", () => {
  describe(".getReport", () => {
    it("should respond with status OK if onSuccess is called", async () => {
      // given
      const { controller } = new GetSimpleReportControllerFixture();

      const response = createResponse();

      // when
      await controller.getReport(response);

      // then
      expect(response.statusCode).equal(StatusCodes.OK);
    })
  })
})
