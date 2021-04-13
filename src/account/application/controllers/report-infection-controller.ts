import {inject, injectable} from "inversify";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {ReportInfectionCommand} from "@src/account/domain/commands/report-infection-command";
import {Response} from "express";
import {Account} from "@src/account/domain/contracts/account";
import {StatusCodes} from "http-status-codes";
import {DomainError} from "@src/common/domain-error";
import {ReportInfectionRequest} from "@src/account/application/controllers/requests/report-infection-request";

@injectable()
@JsonController()
export class ReportInfectionController {
  public constructor(
    @inject(ReportInfectionCommand) private readonly command: ReportInfectionCommand,
  ) {}

  @Post("/report/infection")
  public async report(
    @Res() response: Response,
    @Body() request: ReportInfectionRequest,
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(response);
    this.command.onError = this.onError(response);

    await this.command.execute(request.reporterUsername, request.infectedUsername);

    return response;
  }

  private onSuccess(response: Response): () => Promise<void> {
    return async (): Promise<void> => {
      response.status(StatusCodes.NO_CONTENT).send();
    };
  }

  private onError(response: Response): (error: DomainError) => Promise<void> {
    return async (error: DomainError): Promise<void> => {
      response.status(StatusCodes.UNPROCESSABLE_ENTITY).send(error.toPlain());
    };
  }
}
