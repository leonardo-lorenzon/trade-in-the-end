import {Item} from "@src/inventory/domain/contracts/item";
import {ItemPoints} from "@src/inventory/domain/contracts/item-points";

export class SimpleReport {
  public constructor(
    public numberOfAccounts: number,
    public numberOfHealthAccounts: number,
    public numberOfInfectedAccounts: number,
    public totalItems: Item[],
    public totalInfectedItems: Item[],
    public itemsPoints: ItemPoints[],
  ) {}
}
