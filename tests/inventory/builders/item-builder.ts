import {BaseBuilder} from "@tests/utils/base-builder";
import {Item} from "@src/inventory/domain/contracts/item";
import faker from "faker";
import {ItemName} from "@src/inventory/domain/contracts/item-name";

export class ItemBuilder extends BaseBuilder<Item, ItemBuilder> {
  public constructor() {
    super(ItemBuilder);
  }

  protected buildDefault(): Item {
    return new Item(
      faker.random.arrayElement(Object.values(ItemName)),
      faker.datatype.number(),
    );
  }

}
