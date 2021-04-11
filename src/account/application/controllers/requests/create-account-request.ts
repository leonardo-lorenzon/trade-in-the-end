import {IsArray, IsDateString, IsEnum, IsNumber, IsString, Max, Min, ValidateNested} from "class-validator";
import {Gender} from "@src/account/domain/contracts/gender";
import {Type} from "class-transformer";
import {ItemRequest} from "@src/account/application/controllers/requests/item-request";
import {Account} from "@src/account/domain/contracts/account";
import {Location} from "@src/account/domain/contracts/location";
import {Item} from "@src/inventory/domain/contracts/item";

export class CreateAccountRequest {
  @IsString()
  public username!: string;

  @IsString()
  public name!: string;

  @IsDateString()
  public birthday!: string;

  @IsEnum(Gender)
  public gender!: Gender;

  @IsNumber()
  @Min(-90)
  @Max(90)
  public latitude!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  public longitude!: number;

  @IsArray()
  @ValidateNested()
  @Type(() => ItemRequest)
  public items!: ItemRequest[];

  public buildAccount(): Account {
    return new Account(
      this.username,
      this.name,
      new Date(this.birthday),
      this.gender,
    );
  }

  public buildLocation(): Location {
    return new Location(
      this.latitude,
      this.longitude
    );
  }

  public buildItems(): Item[] {
    return this.items.map((item) => new Item(item.name, item.quantity));
  }
}
