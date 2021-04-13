import {ReportInfectionController} from "@src/account/application/controllers/report-infection-controller";
import {ReportInfectionCommandFixture} from "@tests/account/fixtures/report-infection-command-fixture";

export class ReportInfectionControllerFixture {
  public fixture = new ReportInfectionCommandFixture();

  public get controller(): ReportInfectionController {
    return new ReportInfectionController(this.fixture.command)
  }
}
