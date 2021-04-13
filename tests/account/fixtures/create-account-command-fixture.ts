import {CreateAccountCommand} from "@src/account/domain/commands/create-account-command";
import {InMemoryAccountRepository} from "@src/account/application/repositories/in-memory-account-repository";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {InMemoryLocationRepository} from "@src/account/application/repositories/in-memory-location-repository";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";

export class CreateAccountCommandFixture {
  public database = new InMemoryDatabase();
  public accountRepository = new InMemoryAccountRepository(this.database);
  public locationRepository = new InMemoryLocationRepository(this.database);
  public inventoryRepository = new InMemoryInventoryRepository(this.database);

  public get command(): CreateAccountCommand {
    return new CreateAccountCommand(
      this.accountRepository,
      this.locationRepository,
      this.inventoryRepository,
    )
  }
}
