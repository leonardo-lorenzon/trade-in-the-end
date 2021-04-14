import {TradeItemsCommandFixture} from "@tests/inventory/fixtures/trade-items-command-fixture";
import { expect } from "chai";
import {TradeBuilder} from "@tests/inventory/builders/trade-builder";
import {DomainError} from "@src/common/domain-error";
import {createEmptyDomainError} from "@tests/utils/create-empty-domain-error";
import {ERRORS} from "@src/common/errors";
import {INFECTED_THRESHOLD} from "@src/account/application/repositories/in-memory-infected-repository";

describe("TradeItemsCommand", () => {
  let domainError: DomainError;

  beforeEach(() => {
    domainError = createEmptyDomainError();
  });

  describe(".execute", () => {
    it("should call onError any of the traders is infected", async () => {
      // given
      const { command, infectionRepository } = new TradeItemsCommandFixture();
      command.onError = (error) => domainError = error;

      const trade = new TradeBuilder().build();
      for (let i = 0; i < INFECTED_THRESHOLD; i++) {
        const reporterUsername = `Maria ${i}`;
        await infectionRepository.reportInfection(reporterUsername, trade.sellerUsername);
      }

      // when
      await command.execute(trade);

      // then
      expect(domainError.code).equal(ERRORS.traderInfected.code);
    });

    it("should call onError if trade points does not match", async () => {
      // given
      const { command } = new TradeItemsCommandFixture();
      command.onError = (error) => domainError = error;

      const trade = new TradeBuilder()
        .withInvalidTradePoints()
        .build();

      // when
      await command.execute(trade);

      // then
      expect(domainError.code).equal(ERRORS.invalidTradePoints.code);
    });

    it("should call onError if items are not enough to fulfil the trade", async () => {
      // given
      const { command } = new TradeItemsCommandFixture();
      command.onError = (error) => domainError = error;

      const trade = new TradeBuilder()
        .withValidTradePoints()
        .build();

      // when
      await command.execute(trade);

      // then
      expect(domainError.code).equal(ERRORS.notEnoughItems.code);
    });

    it("should call onSuccess if trade was complete", async () => {
      // given
      const { command, inventoryRepository } = new TradeItemsCommandFixture();
      let onSuccessWasCalled = false;
      command.onSuccess = () => onSuccessWasCalled = true;

      const trade = new TradeBuilder()
        .withValidTradePoints()
        .build();

      await inventoryRepository.addItems(trade.ownerUsername, trade.ownerItems);
      await inventoryRepository.addItems(trade.sellerUsername, trade.sellerItems);

      // when
      await command.execute(trade);

      // then
      expect(onSuccessWasCalled).true;
    });
  });
})
