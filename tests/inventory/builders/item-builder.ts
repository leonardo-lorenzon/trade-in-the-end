import {BaseBuilder} from "@tests/utils/base-builder";
import {Item} from "@src/inventory/domain/contracts/item";
import faker from "faker";
import {ItemName} from "@src/inventory/domain/contracts/item-name";

export class ItemBuilder extends BaseBuilder<Item, ItemBuilder> {
  public constructor() {
    super(ItemBuilder);
  }

  public withItemName(itemName: ItemName): ItemBuilder {
    return this.newBuilder((item) => item.name = itemName);
  }

  public withQuantity(quantity: number): ItemBuilder {
    return this.newBuilder((item) => item.quantity = quantity);
  }

  protected buildDefault(): Item {
    return new Item(
      faker.random.arrayElement(Object.values(ItemName)),
      faker.datatype.number(),
    );
  }

}
