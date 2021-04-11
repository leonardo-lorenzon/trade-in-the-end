import {Item} from "@src/inventory/domain/contracts/item";

export abstract class AddItemsRepository {
  public abstract addItems(username: string, items: Item[]): Promise<void>;
}
