import {BaseBuilder} from "@tests/utils/base-builder";
import {TradeItemsBodyRequest} from "@src/inventory/application/controllers/requests/trade-items-body-request";
import faker from "faker";
import {ItemBuilder} from "@tests/inventory/builders/item-builder";

export class TradeItemsBodyRequestBuilder extends BaseBuilder<TradeItemsBodyRequest, TradeItemsBodyRequestBuilder>{
  public constructor() {
    super(TradeItemsBodyRequestBuilder);
  }

  protected buildDefault(): TradeItemsBodyRequest {
    const request = new TradeItemsBodyRequest();
    const numberOfItems = 3;

    request.ownerUsername = faker.name.lastName();
    request.sellerUsername = faker.name.lastName();
    request.ownerItems = new ItemBuilder().buildMany(numberOfItems);
    request.sellerItems = new ItemBuilder().buildMany(numberOfItems);

    return request;
  }

}
