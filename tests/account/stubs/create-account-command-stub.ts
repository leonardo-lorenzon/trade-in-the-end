import {CreateAccountCommand} from "@src/account/domain/commands/create-account-command";
import {Account} from "@src/account/domain/contracts/account";
import {InMemoryCreateAccountRepository} from "@src/account/application/repositories/in-memory-create-account-repository";
import {InMemoryLocationRepository} from "@src/account/application/repositories/in-memory-location-repository";
import {InMemoryAddItemsRepository} from "@src/inventory/application/repositories/in-memory-add-items-repository";

export class CreateAccountCommandStub extends CreateAccountCommand {
  public constructor() {
    super(
      new InMemoryCreateAccountRepository(),
      new InMemoryLocationRepository(),
      new InMemoryAddItemsRepository(),
    );
  }
  private callback!: () => void;

  async execute(): Promise<void> {
    this.callback()
  }

  public withSuccess(account: Account): CreateAccountCommandStub {
    this.callback = () => this.onSuccess(account);

    return this;
  }

}
