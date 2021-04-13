import {ReportInfectionController} from "@src/account/application/controllers/report-infection-controller";
import {ReportInfectionCommandStub} from "@tests/account/stubs/report-infection-command-stub";

export class ReportInfectionControllerFixture {
  public command = new ReportInfectionCommandStub().withSuccess();

  public get controller(): ReportInfectionController {
    return new ReportInfectionController(this.command)
  }
}
