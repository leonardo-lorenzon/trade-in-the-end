import {Body, JsonController, Post} from "routing-controllers";

@JsonController()
export class CreateAccountController {
  @Post('/account')
  public addUser(@Body() account: unknown): unknown {
    return account;
  }

}
