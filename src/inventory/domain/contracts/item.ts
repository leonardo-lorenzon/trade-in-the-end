import {ItemName} from "@src/inventory/domain/contracts/item-name";

export class Item {
  public constructor(
    public readonly name: ItemName,
    public readonly quantity: number,
  ) {}
}
