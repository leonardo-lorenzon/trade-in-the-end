import {Trade} from "@src/inventory/domain/contracts/trade";

export abstract class TradeItemsRepository {
  public abstract trade(trade: Trade): Promise<void>;
  public abstract isTradePointsValid(trade: Trade): Promise<boolean>;
  public abstract isTradeItemsAvailable(trade: Trade): Promise<boolean>;
}
