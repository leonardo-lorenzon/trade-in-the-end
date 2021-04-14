import {IsEnum, IsInt, IsPositive} from "class-validator";
import {ItemName} from "@src/inventory/domain/contracts/item-name";

export class TradeItemRequest {
  @IsEnum(ItemName)
  public name!: ItemName;

  @IsInt()
  @IsPositive()
  public quantity!: number;
}
