import {CreateAccountController} from "@src/account/application/controllers/create-account-controller";
import {CreateAccountCommandFixture} from "@tests/account/fixtures/create-account-command-fixture";

export class CreateAccountControllerFixture {
  public fixture = new CreateAccountCommandFixture();

  public get controller(): CreateAccountController {
    return new CreateAccountController(this.fixture.command)
  }
}
