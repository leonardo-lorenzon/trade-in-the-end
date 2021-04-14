import {GetSimpleReportCommand} from "@src/reports/domain/commands/get-simple-report-command";
import {InMemoryReportService} from "@src/reports/application/services/in-memory-report-service";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {InMemoryAccountRepository} from "@src/account/application/repositories/in-memory-account-repository";
import {InMemoryInfectedRepository} from "@src/account/application/repositories/in-memory-infected-repository";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";

export class GetSimpleReportCommandFixture {
  private database = new InMemoryDatabase();
  public reportService = new InMemoryReportService(
    new InMemoryAccountRepository(this.database),
    new InMemoryInfectedRepository(this.database),
    new InMemoryInventoryRepository(this.database),
  );
  public get command(): GetSimpleReportCommand {
    return new GetSimpleReportCommand(this.reportService);
  }
}
