import {BaseBuilder} from "@tests/utils/base-builder";
import {Trade} from "@src/inventory/domain/contracts/trade";
import * as faker from "faker";
import {ItemBuilder} from "@tests/inventory/builders/item-builder";
import {Item} from "@src/inventory/domain/contracts/item";
import {ItemName} from "@src/inventory/domain/contracts/item-name";

export class TradeBuilder extends BaseBuilder<Trade, TradeBuilder> {
  public constructor() {
    super(TradeBuilder);
  }

  public withOwnerUsername(username: string): TradeBuilder {
    return this.newBuilder((trade) => trade.ownerUsername = username)
  }

  public withSellerUsername(username: string): TradeBuilder {
    return this.newBuilder((trade) => trade.sellerUsername = username)
  }

  public withOwnerItems(items: Item[]): TradeBuilder {
    return this.newBuilder((trade) => trade.ownerItems = items)
  }

  public withSellerItems(items: Item[]): TradeBuilder {
    return this.newBuilder((trade) => trade.sellerItems = items)
  }

  public withValidTradePoints(): TradeBuilder {
    const five = 5;
    const six = 6;
    const fiveFigiWater = new ItemBuilder()
      .withItemName(ItemName.figiWater)
      .withQuantity(five)
      .build();
    const fiveFirstAid = new ItemBuilder()
      .withItemName(ItemName.firstAidPouch)
      .withQuantity(five)
      .build();
    const sixAk47 =  new ItemBuilder()
      .withItemName(ItemName.ak47)
      .withQuantity(six)
      .build();
    const sixCampbellSoup =  new ItemBuilder()
      .withItemName(ItemName.campbellSoup)
      .withQuantity(six)
      .build();

    return this.newBuilder((trade) => {
      trade.ownerItems = [fiveFigiWater, fiveFirstAid];
      trade.sellerItems = [sixAk47, sixCampbellSoup];
    })
  }

  public withInvalidTradePoints(): TradeBuilder {
    const five = 5;
    const six = 6;
    const fiveFigiWater = new ItemBuilder()
      .withItemName(ItemName.figiWater)
      .withQuantity(five)
      .build();
    const sixAk47 =  new ItemBuilder()
      .withItemName(ItemName.ak47)
      .withQuantity(six)
      .build();

    return this.newBuilder((trade) => {
      trade.ownerItems = [fiveFigiWater];
      trade.sellerItems = [sixAk47];
    })
  }

  protected buildDefault(): Trade {
    const numberOfItems = 3;

    return new Trade(
      faker.name.lastName(),
      faker.name.lastName(),
      new ItemBuilder()
        .buildMany(numberOfItems),
      new ItemBuilder()
        .buildMany(numberOfItems),
    );
  }
}
