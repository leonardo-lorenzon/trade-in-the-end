import {inject, injectable} from "inversify";
import {TradeItemsRepository} from "@src/inventory/domain/repositories/trade-items-repository";
import {Trade} from "@src/inventory/domain/contracts/trade";
import {noop} from "@src/lib/noop";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";
import {InfectionRepository} from "@src/account/domain/repositories/infection-repository";

@injectable()
export class TradeItemsCommand {
  public onSuccess: () => void = noop;
  public onError: (error: DomainError) => void = noop;

  public constructor(
    @inject(TradeItemsRepository) private readonly tradeRepository: TradeItemsRepository,
    @inject(InfectionRepository) private readonly infectionRepository: InfectionRepository,
  ) {}

  public async execute(trade: Trade): Promise<void> {
    if (await this.isAnyTraderInfected(trade)) {
      return this.onError(new DomainError(ERRORS.traderInfected))
    }

    if (!(await this.tradeRepository.isTradePointsValid(trade))) {
      return this.onError(new DomainError(ERRORS.invalidTradePoints));
    }

    if (!(await this.tradeRepository.isTradeItemsAvailable(trade))) {
      return this.onError(new DomainError(ERRORS.notEnoughItems))
    }

    await this.tradeRepository.trade(trade);
    this.onSuccess();
  }

  private async isAnyTraderInfected(trade: Trade): Promise<boolean> {
    const isOwnerInfected = await this.infectionRepository.isInfected(trade.ownerUsername);
    const isSellerInfected = await this.infectionRepository.isInfected(trade.sellerUsername);

    return isOwnerInfected || isSellerInfected;
  }
}
