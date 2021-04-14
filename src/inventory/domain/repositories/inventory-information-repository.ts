import {Item} from "@src/inventory/domain/contracts/item";
import {Account} from "@src/account/domain/contracts/account";
import {ItemPoints} from "@src/inventory/domain/contracts/item-points";

export abstract class InventoryInformationRepository {
  public abstract getInventory(): Promise<Item[]>;
  public abstract getAllItemsFromAccounts(accounts: Account[]): Promise<Item[]>;
  public abstract getItemsPoints(): Promise<ItemPoints[]>;
}
