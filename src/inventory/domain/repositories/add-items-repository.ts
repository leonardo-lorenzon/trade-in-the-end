import {Item} from "@src/inventory/domain/contracts/item";
import {Uuid} from "@src/lib/uuid";

export abstract class AddItemsRepository {
  public abstract addItems(accountId: Uuid, items: Item[]): Promise<void>;
}
