import {ReportInfectionCommand} from "@src/account/domain/commands/report-infection-command";
import {InMemoryInfectedRepository} from "@src/account/application/repositories/in-memory-infected-repository";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";

export class ReportInfectionCommandFixture {
  public database = new InMemoryDatabase();
  public repository = new InMemoryInfectedRepository(this.database);

  public get command(): ReportInfectionCommand {
    return new ReportInfectionCommand(this.repository)
  }
}
