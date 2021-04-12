import {CreateAccountCommand} from "@src/account/domain/commands/create-account-command";
import {Account} from "@src/account/domain/contracts/account";
import {InMemoryAccountRepository} from "@src/account/application/repositories/in-memory-account-repository";
import {InMemoryLocationRepository} from "@src/account/application/repositories/in-memory-location-repository";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";

export class CreateAccountCommandStub extends CreateAccountCommand {
  public constructor() {
    const database = new InMemoryDatabase()
    super(
      new InMemoryAccountRepository(database),
      new InMemoryLocationRepository(database),
      new InMemoryInventoryRepository(database),
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
