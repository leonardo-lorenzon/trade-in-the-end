import {ItemName} from "@src/inventory/domain/contracts/item-name";

export class Item {
  public constructor(
    public name: ItemName,
    public quantity: number,
  ) {}
}
