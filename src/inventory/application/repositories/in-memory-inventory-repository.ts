import {AddItemsRepository} from "@src/inventory/domain/repositories/add-items-repository";
import {Item} from "@src/inventory/domain/contracts/item";
import {inject, injectable} from "inversify";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";
import {TradeItemsRepository} from "@src/inventory/domain/repositories/trade-items-repository";
import {Trade} from "@src/inventory/domain/contracts/trade";
import {InventoryInformationRepository} from "@src/inventory/domain/repositories/inventory-information-repository";
import {Account} from "@src/account/domain/contracts/account";
import {ItemPoints} from "@src/inventory/domain/contracts/item-points";

@injectable()
export class InMemoryInventoryRepository implements AddItemsRepository, TradeItemsRepository, InventoryInformationRepository {
  public constructor(
    @inject(InMemoryDatabase) private readonly database: InMemoryDatabase,
  ) {}

  public async addItems(username: string, items: Item[]): Promise<void> {
    if (this.database.accountHasItems(username)) {
      throw new DomainError(ERRORS.accountHasItems)
    }
    this.database.insertItems(username, items);
  }

  public async trade(trade: Trade): Promise<void> {
    this.database.exchangeItems(trade);
  }

  public async isTradePointsValid(trade: Trade): Promise<boolean> {
    const ownerItemsPoints = this.getTotalPoints(trade.ownerItems);
    const sellerItemsPoints = this.getTotalPoints(trade.sellerItems);

    return ownerItemsPoints === sellerItemsPoints;
  }

  public async isTradeItemsAvailable(trade: Trade): Promise<boolean> {
    const isOwnerItemsEnough = this.database.isItemsAvailable(trade.ownerUsername, trade.ownerItems);
    const isSellerItemsEnough = this.database.isItemsAvailable(trade.sellerUsername, trade.sellerItems);

    return isOwnerItemsEnough && isSellerItemsEnough;
  }

  public async getAllItemsFromAccounts(accounts: Account[]): Promise<Item[]> {
    return this.database.getAllItemsFromAccounts(accounts);
  }

  public async getInventory(): Promise<Item[]> {
    return this.database.getInventory();
  }

  public async getItemsPoints(): Promise<ItemPoints[]> {
    return this.database.getItemsPoints();
  }

  private getTotalPoints(items: Item[]): number {
    const initialPoints = 0;
    const points = items.reduce((finalPoints, item) => {
      return finalPoints + (this.database.getItemPoints(item.name) * item.quantity);
    }, initialPoints);

    return parseInt(points.toString());
  }
}
