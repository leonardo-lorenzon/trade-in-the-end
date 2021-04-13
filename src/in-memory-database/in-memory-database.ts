import {Account} from "@src/account/domain/contracts/account";
import {Location} from "@src/account/domain/contracts/location";
import {injectable} from "inversify";
import {Item} from "@src/inventory/domain/contracts/item";
import {ItemName} from "@src/inventory/domain/contracts/item-name";

@injectable()
export class InMemoryDatabase {
  private readonly accounts: Map<string, Account> = new Map<string, Account>();
  private readonly locations: Map<string, Location> = new Map<string, Location>();
  private inventory: Map<string, Map<ItemName, number>> = new Map<string, Map<ItemName, number>>();
  private infected: Map<string, string[]> = new Map<string, string[]>();

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
    const defaultQuantity = 0;
    const uniqueItems = new Map<ItemName, number>();

    items.forEach((item) => {
      const currentQuantity = uniqueItems.get(item.name) || defaultQuantity;
      uniqueItems.set(item.name, item.quantity + currentQuantity);
    });

    this.inventory.set(username, uniqueItems);
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
}
