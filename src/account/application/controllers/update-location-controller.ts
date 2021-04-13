import {inject, injectable} from "inversify";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {UpdateLocationCommand} from "@src/account/domain/commands/update-location-command";
import {Response} from "express";
import {StatusCodes} from "http-status-codes";
import {DomainError} from "@src/common/domain-error";
import {UpdateLocationRequest} from "@src/account/application/controllers/requests/update-location-request";

@injectable()
@JsonController()
export class UpdateLocationController {
  public constructor(
    @inject(UpdateLocationCommand) private readonly command: UpdateLocationCommand,
  ) {}

  @Post("/update/location")
  public async updateLocation(
    @Res() response: Response,
    @Body() request: UpdateLocationRequest,
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(response);
    this.command.onError = this.onError(response);

    await this.command.execute(request.username, request.buildLocation());

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
