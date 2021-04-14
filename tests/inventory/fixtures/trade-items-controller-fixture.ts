import {TradeItemsController} from "@src/inventory/application/controllers/trade-items-controller";
import {TradeItemsCommandStub} from "@tests/inventory/stubs/trade-items-command-stub";

export class TradeItemsControllerFixture {
  public commandStub = new TradeItemsCommandStub();

  public get controller(): TradeItemsController {
    return new TradeItemsController(this.commandStub);
  }
}
