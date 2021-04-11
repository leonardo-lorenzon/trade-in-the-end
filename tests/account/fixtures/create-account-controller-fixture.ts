import {CreateAccountController} from "@src/account/application/controllers/create-account-controller";
import {CreateAccountCommandStub} from "@tests/account/stubs/create-account-command-stub";

export class CreateAccountControllerFixture {
  public createAccountCommand = new CreateAccountCommandStub();

  public get controller(): CreateAccountController {
    return new CreateAccountController(this.createAccountCommand)
  }
}
