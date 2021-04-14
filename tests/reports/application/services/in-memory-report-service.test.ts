import {InMemoryReportService} from "@src/reports/application/services/in-memory-report-service";
import {ReportsService} from "@src/reports/domain/services/reports-service";
import {InMemoryAccountRepository} from "@src/account/application/repositories/in-memory-account-repository";
import {InMemoryInfectedRepository} from "@src/account/application/repositories/in-memory-infected-repository";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import { expect } from "chai";

describe("InMemoryReportService", () => {
  let reportService: ReportsService;
  beforeEach(() => {
    const database = new InMemoryDatabase();
    reportService = new InMemoryReportService(
      new InMemoryAccountRepository(database),
      new InMemoryInfectedRepository(database),
      new InMemoryInventoryRepository(database),
    );
  })
  describe(".getSimpleReport", () => {
    it("should return the report", async () => {
      // given

      // when
      const report = await reportService.getSimpleReport();

      // then
      expect(report).exist
    })
  })
});
