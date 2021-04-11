import {AddItemsRepository} from "@src/inventory/domain/repositories/add-items-repository";
import {Item} from "@src/inventory/domain/contracts/item";
import {injectable} from "inversify";

@injectable()
export class InMemoryAddItemsRepository implements AddItemsRepository {
  private inventory: Map<string, Item[]> = new Map<string, Item[]>();

  public async addItems(username: string, items: Item[]): Promise<void> {
    this.inventory.set(username, items);
  }

}
