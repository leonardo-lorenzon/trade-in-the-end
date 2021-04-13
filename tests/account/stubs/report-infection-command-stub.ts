import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {ReportInfectionCommand} from "@src/account/domain/commands/report-infection-command";
import {InMemoryInfectedRepository} from "@src/account/application/repositories/in-memory-infected-repository";

export class ReportInfectionCommandStub extends ReportInfectionCommand {
  public constructor() {
    const database = new InMemoryDatabase()
    super(
      new InMemoryInfectedRepository(database),
    );
  }
  private callback!: () => void;

  async execute(): Promise<void> {
    this.callback()
  }

  public withSuccess(): ReportInfectionCommandStub {
    this.callback = () => this.onSuccess();

    return this;
  }

}
