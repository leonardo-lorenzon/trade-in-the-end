import {IsEnum, IsInt, IsPositive} from "class-validator";
import {ItemName} from "@src/inventory/domain/contracts/item-name";

export class ItemRequest {
  @IsEnum(ItemName)
  public name!: ItemName;

  @IsInt()
  @IsPositive()
  public quantity!: number;
}
