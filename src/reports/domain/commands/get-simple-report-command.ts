import {inject, injectable} from "inversify";
import {ReportsService} from "@src/reports/domain/services/reports-service";
import {noop} from "@src/lib/noop";
import {SimpleReport} from "@src/reports/domain/contracts/simple-report";

@injectable()
export class GetSimpleReportCommand {
  public onSuccess: (report: SimpleReport) => void = noop;

  public constructor(
    @inject(ReportsService) private readonly reportsService: ReportsService,
  ) {}

  public async execute(): Promise<void> {
    const report = await this.reportsService.getSimpleReport();
    this.onSuccess(report);
  }
}
