import { Response } from "express";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {inject, injectable} from "inversify";
import {CreateAccountCommand} from "@src/account/domain/commands/create-account-command";
import {StatusCodes} from "http-status-codes";

@injectable()
@JsonController()
export class CreateAccountController {
  public constructor(
    @inject(CreateAccountCommand) private readonly createAccountCommand: CreateAccountCommand,
  ) {}
  @Post('/account')
  public async createUser(
    @Res() response: Response,
    @Body() account: unknown
  ): Promise<Response> {
    this.createAccountCommand.onSuccess = this.onSuccess(response);

    await this.createAccountCommand.execute(account);

    return response;
  }

  private onSuccess(response: Response): (account: unknown) => Promise<void> {
    return async (account: unknown): Promise<void> => {
      response.status(StatusCodes.OK).send(account);
    };
  }

}
