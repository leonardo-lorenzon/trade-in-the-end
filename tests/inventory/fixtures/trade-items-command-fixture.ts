import {TradeItemsCommand} from "@src/inventory/domain/commands/trade-items-command";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {InMemoryInfectedRepository} from "@src/account/application/repositories/in-memory-infected-repository";

export class TradeItemsCommandFixture {
  private database = new InMemoryDatabase();
  public inventoryRepository = new InMemoryInventoryRepository(this.database);
  public infectionRepository = new InMemoryInfectedRepository(this.database);

  public get command(): TradeItemsCommand {
    return new TradeItemsCommand(this.inventoryRepository, this.infectionRepository);
  }
}
