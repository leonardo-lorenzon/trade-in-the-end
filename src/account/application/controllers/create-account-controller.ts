import {Body, JsonController, Post} from "routing-controllers";

@JsonController()
export class CreateAccountController {
  @Post('/account')
  public async createUser(@Body() account: unknown): Promise<unknown> {
    return account;
  }

}
