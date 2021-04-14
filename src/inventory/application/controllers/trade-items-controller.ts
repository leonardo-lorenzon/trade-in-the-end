import {inject, injectable} from "inversify";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {Response} from "express";
import {TradeItemsBodyRequest} from "@src/inventory/application/controllers/requests/trade-items-body-request";
import {TradeItemsCommand} from "@src/inventory/domain/commands/trade-items-command";
import {StatusCodes} from "http-status-codes";
import {DomainError} from "@src/common/domain-error";

@injectable()
@JsonController()
export class TradeItemsController {
  public constructor(
    @inject(TradeItemsCommand) private readonly command: TradeItemsCommand,
  ) {}
  @Post("/trade/items")
  public async trade(
    @Res() response: Response,
    @Body() request: TradeItemsBodyRequest,
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(response);
    this.command.onError = this.onError(response);

    await this.command.execute(request.buildTrade());

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
