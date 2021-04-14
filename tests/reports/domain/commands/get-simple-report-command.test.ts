import {GetSimpleReportCommandFixture} from "@tests/reports/fixtures/get-simple-report-command-fixture";
import { expect } from "chai";

describe("GetSimpleReportCommand", () => {
  describe(".execute", () => {
    it("should call onSuccess when get report successfully", async () => {
      // given
      const { command } = new GetSimpleReportCommandFixture();
      let onSuccessWasCalled = false;
      command.onSuccess = () => onSuccessWasCalled = true;

      // when
      await command.execute();

      // then
      expect(onSuccessWasCalled).true;
    });
  })
})
