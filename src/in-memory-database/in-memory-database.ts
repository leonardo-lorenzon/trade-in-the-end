/* eslint-disable no-magic-numbers */
import {Account} from "@src/account/domain/contracts/account";
import {Location} from "@src/account/domain/contracts/location";
import {injectable} from "inversify";
import {Item} from "@src/inventory/domain/contracts/item";
import {ItemName} from "@src/inventory/domain/contracts/item-name";
import {Trade} from "@src/inventory/domain/contracts/trade";

const DEFAULT_QUANTITY = 0;

@injectable()
export class InMemoryDatabase {
  private readonly accounts: Map<string, Account> = new Map<string, Account>();
  private readonly locations: Map<string, Location> = new Map<string, Location>();
  private inventory: Map<string, Map<ItemName, number>> = new Map<string, Map<ItemName, number>>();
  private infected: Map<string, string[]> = new Map<string, string[]>();
  private itemsPoints: Map<ItemName, number> = new Map<ItemName, number>([
    [ItemName.figiWater, 14],
    [ItemName.campbellSoup, 12],
    [ItemName.firstAidPouch, 10],
    [ItemName.ak47, 8],
  ])

  public insertAccount(account: Account): void {
    this.accounts.set(account.username, account)
  }

  public hasAccount(username: string): boolean {
    return this.accounts.has(username)
  }

  public upsertLocation(username: string, location: Location): void {
    this.locations.set(username, location);
  }

  // for test only purposes
  public getLocation(username: string): Location|undefined {
    return this.locations.get(username);
  }

  public insertItems(username: string, items: Item[]): void {
    const uniqueItems = new Map<ItemName, number>();

    items.forEach((item) => {
      const currentQuantity = uniqueItems.get(item.name) || DEFAULT_QUANTITY;
      uniqueItems.set(item.name, item.quantity + currentQuantity);
    });

    this.inventory.set(username, uniqueItems);
  }

  public exchangeItems(trade: Trade): void {
    this.debitOwnerCreditSellerItems(trade);
    this.debitSellerCreditOwnerItems(trade);
  }

  public accountHasItems(username: string): boolean {
    return this.inventory.has(username);
  }

  // only for test purposes
  public retrieveItems(username: string): Item[] {
    const items: Item[] = [];
    const uniqueItems = this.inventory.get(username);
    if (uniqueItems === undefined) {
      return items;
    }

    uniqueItems.forEach((quantity, itemName) => {
      items.push(new Item(itemName, quantity));
    })

    return items;
  }

  public isItemsAvailable(username: string, items: Item[]): boolean {
    const itemsAvailable = this.inventory.get(username);

    if (itemsAvailable === undefined) {
      return false;
    }

    const exceededItem = items.find((item) => {
      const availableQuantity = itemsAvailable.get(item.name);

      if (availableQuantity === undefined) {
        return true;
      }

      return item.quantity > availableQuantity;
    })

    return exceededItem === undefined;
  }

  public getItemPoints(itemName: ItemName): number {
    const points = this.itemsPoints.get(itemName);
    if (points === undefined) {
      return 0;
    }
    return points;
  }

  public getReportersForUsername(username: string): string[] {
    const reporters = this.infected.get(username);

    if (reporters === undefined) {
      return [];
    }

    return reporters;
  }

  public reportInfectedUsername(reporterUsername: string, infectedUsername: string): void {
    const reporters = this.infected.get(infectedUsername) || [];

    // copy array
    const newReporters = reporters.map((reporter) =>  reporter);
    newReporters.push(reporterUsername);

    this.infected.set(infectedUsername, newReporters);
  }

  private debitOwnerCreditSellerItems(trade: Trade): void {
    const currentOwnerItems = this.inventory.get(trade.ownerUsername);
    const currentSellerItems = this.inventory.get(trade.sellerUsername);
    if (currentOwnerItems === undefined) {
      throw new Error("Owner has no items");
    }
    if (currentSellerItems === undefined) {
      throw new Error("Seller has no items");
    }
    trade.ownerItems.forEach((item) => {
      const currentItemOwnerQuantity = currentOwnerItems.get(item.name);
      const currentItemSellerQuantity = currentSellerItems.get(item.name) || DEFAULT_QUANTITY;

      if (currentItemOwnerQuantity === undefined || currentItemOwnerQuantity < item.quantity) {
        throw new Error(`Owner does not have enough item quantity for ${item.name}`)
      }
      currentOwnerItems.set(item.name, currentItemOwnerQuantity - item.quantity);
      currentSellerItems.set(item.name, currentItemSellerQuantity + item.quantity);
    })
  }

  private debitSellerCreditOwnerItems(trade: Trade): void {
    const currentSellerItems = this.inventory.get(trade.sellerUsername);
    const currentOwnerItems = this.inventory.get(trade.ownerUsername);
    if (currentSellerItems === undefined) {
      throw new Error("Seller has no items");
    }
    if (currentOwnerItems === undefined) {
      throw new Error("Owner has no items");
    }
    trade.sellerItems.forEach((item) => {
      const currentItemSellerQuantity = currentSellerItems.get(item.name);
      const currentItemOwnerQuantity = currentOwnerItems.get(item.name) || DEFAULT_QUANTITY;
      if (currentItemSellerQuantity === undefined || currentItemSellerQuantity < item.quantity) {
        throw new Error(`Seller does not have enough item quantity for ${item.name}`)
      }
      currentSellerItems.set(item.name, currentItemSellerQuantity - item.quantity);
      currentOwnerItems.set(item.name, currentItemOwnerQuantity + item.quantity)
    })
  }
}
/* eslint-enable no-magic-numbers */
