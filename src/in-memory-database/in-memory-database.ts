import {Account} from "@src/account/domain/contracts/account";
import {Location} from "@src/account/domain/contracts/location";
import {injectable} from "inversify";
import {Item} from "@src/inventory/domain/contracts/item";

@injectable()
export class InMemoryDatabase {
  private readonly accounts: Map<string, Account> = new Map<string, Account>();
  private readonly locations: Map<string, Location> = new Map<string, Location>();
  private inventory: Map<string, Item[]> = new Map<string, Item[]>();

  public insertAccount(account: Account): void {
    this.accounts.set(account.username, account)
  }

  public hasAccount(username: string): boolean {
    return this.accounts.has(username)
  }

  public upsertLocation(username: string, location: Location): void {
    this.locations.set(username, location);
  }

  // for test only
  public getLocation(username: string): Location|undefined {
    return this.locations.get(username);
  }

  public insertItems(username: string, items: Item[]): void {
    this.inventory.set(username, items);
  }
}
