import {IsArray, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {TradeItemRequest} from "@src/inventory/application/controllers/requests/trade-item-request";
import {Trade} from "@src/inventory/domain/contracts/trade";
import {Item} from "@src/inventory/domain/contracts/item";

export class TradeItemsBodyRequest {
  @IsString()
  public ownerUsername!: string;

  @IsString()
  public sellerUsername!: string;

  @IsArray()
  @ValidateNested()
  @Type(() => TradeItemRequest)
  public ownerItems!: TradeItemRequest[];

  @IsArray()
  @ValidateNested()
  @Type(() => TradeItemRequest)
  public sellerItems!: TradeItemRequest[];

  public buildTrade(): Trade {
    return new Trade(
      this.ownerUsername,
      this.sellerUsername,
      this.buildItems(this.ownerItems),
      this.buildItems(this.sellerItems),
    )
  }

  private buildItems(items: TradeItemRequest[]): Item[] {
    return items.map((item) => {
      return new Item(item.name, item.quantity);
    })
  }
}
