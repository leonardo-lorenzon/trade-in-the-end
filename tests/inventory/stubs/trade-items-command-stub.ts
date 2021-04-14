import {noop} from "@src/lib/noop";
import {TradeItemsCommand} from "@src/inventory/domain/commands/trade-items-command";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {InMemoryInfectedRepository} from "@src/account/application/repositories/in-memory-infected-repository";

export class TradeItemsCommandStub extends TradeItemsCommand {
  private callback = noop;

  public constructor(database = new InMemoryDatabase()) {
    super(
      new InMemoryInventoryRepository(database),
      new InMemoryInfectedRepository(database)
    );
  }

  public async execute(): Promise<void> {
    await this.callback();
  }

  public withSuccess(): TradeItemsCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onSuccess();
    };
    return this;
  }
}
