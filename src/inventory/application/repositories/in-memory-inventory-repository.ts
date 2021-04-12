import {AddItemsRepository} from "@src/inventory/domain/repositories/add-items-repository";
import {Item} from "@src/inventory/domain/contracts/item";
import {inject, injectable} from "inversify";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";

@injectable()
export class InMemoryInventoryRepository implements AddItemsRepository {
  public constructor(
    @inject(InMemoryDatabase) private readonly database: InMemoryDatabase,
  ) {}

  public async addItems(username: string, items: Item[]): Promise<void> {
    if (this.database.accountHasItems(username)) {
      throw new DomainError(ERRORS.accountHasItems)
    }
    this.database.insertItems(username, items);
  }

}
