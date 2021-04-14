import {Item} from "@src/inventory/domain/contracts/item";

export class Trade {
  public constructor(
    public ownerUsername: string,
    public sellerUsername: string,
    public ownerItems: Item[],
    public sellerItems: Item[],
  ) {}
}
