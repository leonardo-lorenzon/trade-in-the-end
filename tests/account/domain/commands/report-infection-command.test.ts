import {ReportInfectionCommandFixture} from "@tests/account/fixtures/report-infection-command-fixture";
import { expect } from "chai";
import faker from "faker";

describe("ReportInfectionCommand", () => {
  describe(".execute", () => {
    it("should report a infection successfully storing it on database", async () => {
      // given
      const reporterUsername = faker.name.lastName();
      const infectedUsername = faker.name.lastName();

      const { command, database } = new ReportInfectionCommandFixture();

      // when
      await command.execute(reporterUsername, infectedUsername);

      // then
      const reporters = database.getReportersForUsername(infectedUsername);
      expect(reporters.includes(reporterUsername)).true;
    })
  })
})
