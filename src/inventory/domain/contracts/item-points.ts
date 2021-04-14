import {ItemName} from "@src/inventory/domain/contracts/item-name";

export class ItemPoints {
  public constructor(
    public readonly name: ItemName,
    public readonly points: number,
  ) {}
}
