import { Response } from "express";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {inject, injectable} from "inversify";
import {CreateAccountCommand} from "@src/account/domain/commands/create-account-command";
import {StatusCodes} from "http-status-codes";
import {Account} from "@src/account/domain/contracts/account";
import {CreateAccountResponse} from "@src/account/application/controllers/responses/create-account-response";
import {CreateAccountRequest} from "@src/account/application/controllers/requests/create-account-request";
import {DomainError} from "@src/common/domain-error";

@injectable()
@JsonController()
export class CreateAccountController {
  public constructor(
    @inject(CreateAccountCommand) private readonly createAccountCommand: CreateAccountCommand,
  ) {}
  @Post('/create/account')
  public async createUser(
    @Res() response: Response,
    @Body() request: CreateAccountRequest,
  ): Promise<Response> {
    this.createAccountCommand.onSuccess = this.onSuccess(response);
    this.createAccountCommand.onError = this.onError(response);

    await this.createAccountCommand.execute(
      request.buildAccount(),
      request.buildLocation(),
      request.buildItems()
    );

    return response;
  }

  private onSuccess(response: Response): (account: Account) => Promise<void> {
    return async (account: Account): Promise<void> => {
      response.status(StatusCodes.OK).send(new CreateAccountResponse(account).toPlain());
    };
  }

  private onError(response: Response): (error: DomainError) => Promise<void> {
    return async (error: DomainError): Promise<void> => {
      response.status(StatusCodes.UNPROCESSABLE_ENTITY).send(error.toPlain());
    };
  }

}
