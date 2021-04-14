import {inject, injectable} from "inversify";
import {Get, JsonController, Res} from "routing-controllers";
import {Response} from "express";
import {GetSimpleReportCommand} from "@src/reports/domain/commands/get-simple-report-command";
import {StatusCodes} from "http-status-codes";
import {SimpleReport} from "@src/reports/domain/contracts/simple-report";
import {GetSimpleReportResponse} from "@src/reports/application/controllers/responses/get-simple-report-response";

@injectable()
@JsonController()
export class GetSimpleReportController {
  public constructor(
    @inject(GetSimpleReportCommand) private readonly command: GetSimpleReportCommand,
  ) {}
  @Get("/report")
  public async getReport(
    @Res() response: Response,
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(response);

    await this.command.execute();

    return response;
  }

  private onSuccess(response: Response): (report: SimpleReport) => Promise<void> {
    return async (report: SimpleReport): Promise<void> => {
      response.status(StatusCodes.OK).send(new GetSimpleReportResponse(report).toPlain());
    };
  }
}
