import {ReportInfectionControllerFixture} from "@tests/account/fixtures/report-infection-controller-fixture";
import {createResponse} from "node-mocks-http";
import {ReportInfectionRequest} from "@src/account/application/controllers/requests/report-infection-request";
import faker from "faker";
import { expect } from "chai";
import {StatusCodes} from "http-status-codes";

describe("ReportInfectionController", () => {
  describe(".report", () => {
    it("should send NO_CONTENT if onSuccess callback is called", async () => {
      // given
      const { controller } = new ReportInfectionControllerFixture()
      const response = createResponse();
      const request: ReportInfectionRequest = {
        reporterUsername:faker.name.lastName(),
        infectedUsername: faker.name.lastName(),
      }

      // when
      await controller.report(response, request);

      // then
      expect(response.statusCode).equal(StatusCodes.NO_CONTENT);
    });
  })
})
