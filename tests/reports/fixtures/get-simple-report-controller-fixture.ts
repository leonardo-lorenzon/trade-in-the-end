import {GetSimpleReportController} from "@src/reports/application/controllers/get-simple-report-controller";
import {GetSimpleReportCommandFixture} from "@tests/reports/fixtures/get-simple-report-command-fixture";

export class GetSimpleReportControllerFixture {
  private commandFixture = new GetSimpleReportCommandFixture();
  public get controller(): GetSimpleReportController {
    return new GetSimpleReportController(this.commandFixture.command)
  }
}
