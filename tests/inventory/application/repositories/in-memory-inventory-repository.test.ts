import faker from "faker";
import {expect} from "chai";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";
import {ItemBuilder} from "@tests/inventory/builders/item-builder";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {ItemName} from "@src/inventory/domain/contracts/item-name";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";
import {TradeBuilder} from "@tests/inventory/builders/trade-builder";

describe("InMemoryInventoryRepository", () => {
  let inventoryRepository: InMemoryInventoryRepository;
  let database: InMemoryDatabase;
  beforeEach(() => {
    database = new InMemoryDatabase();
    inventoryRepository = new InMemoryInventoryRepository(database);
  });

  describe(".addItems", () => {
    it("should merge same items when store it on database", async () => {
      // given
      const username = faker.name.lastName();
      const numberOfSameItems = 3;
      const quantityOfEachInsertion = 5;
      const items = new ItemBuilder()
        .withItemName(ItemName.ak47)
        .withQuantity(quantityOfEachInsertion)
        .buildMany(numberOfSameItems);

      // when
      await inventoryRepository.addItems(username, items);

      // then
      const firstItem = 0;
      const expectedNumberOfItems = 1;
      const expectedQuantityOfItem = numberOfSameItems * quantityOfEachInsertion;
      const itemsRetrieved = database.retrieveItems(username);

      expect(itemsRetrieved.length).equal(expectedNumberOfItems);
      expect(itemsRetrieved[firstItem].quantity).equal(expectedQuantityOfItem);
    });

    it("should throw a domain error when try to insert item to a account that already has items", async () => {
      // given
      const username = faker.name.lastName();
      const numberOfItems = 3;
      const items = new ItemBuilder()
        .buildMany(numberOfItems);

      try {
        // when
        await inventoryRepository.addItems(username, items);
        await inventoryRepository.addItems(username, items);
        expect.fail("Should throw a domain error");
      } catch (error) {
        // then
        expect(error).instanceOf(DomainError);
        expect(error.code).equal(ERRORS.accountHasItems.code);
      }

    });
  })

  describe(".trade", () => {
    it("should exchange the proposed items on trade between the accounts", async () => {
      // given
      const ownerUsername = "Maria";
      const sellerUsername = "João";

      const ownerItem = new ItemBuilder()
        .withItemName(ItemName.ak47)
        .build();
      const sellerItem = new ItemBuilder()
        .withItemName(ItemName.figiWater)
        .build();

      const trade = new TradeBuilder()
        .withOwnerUsername(ownerUsername)
        .withSellerUsername(sellerUsername)
        .withOwnerItems([ownerItem])
        .withSellerItems([sellerItem])
        .build();

      await inventoryRepository.addItems(ownerUsername, [ownerItem]);
      await inventoryRepository.addItems(sellerUsername, [sellerItem]);

      // when
      await inventoryRepository.trade(trade);

      // then
      const expectedOwnerItems = [
        {
          name: ItemName.ak47,
          quantity: 0,
        },
        {
          name: ItemName.figiWater,
          quantity: sellerItem.quantity
        }
      ];
      const expectedSellerItems = [
        {
          name: ItemName.figiWater,
          quantity: 0,
        },
        {
          name: ItemName.ak47,
          quantity: ownerItem.quantity,
        }
      ];
      expect(database.retrieveItems(trade.ownerUsername)).deep.equal(expectedOwnerItems);
      expect(database.retrieveItems(trade.sellerUsername)).deep.equal(expectedSellerItems);
    })
  });

  describe(".isTradePointsValid", () => {
    it("should return true if points match", async () => {
      // given
      const trade = new TradeBuilder()
        .withValidTradePoints()
        .build();

      // when
      const isValid = await inventoryRepository.isTradePointsValid(trade);

      // then
      expect(isValid).true;
    });

    it("should return false if points do not match", async () => {
      // given
      const trade = new TradeBuilder()
        .withInvalidTradePoints()
        .build();

      // when
      const isValid = await inventoryRepository.isTradePointsValid(trade);

      // then
      expect(isValid).false;
    });
  });

  describe(".isTradeItemsAvailable", () => {
    it("should return true if items are available in both accounts", async () => {
      // given
      const trade = new TradeBuilder().build();

      await inventoryRepository.addItems(trade.ownerUsername, trade.ownerItems);
      await inventoryRepository.addItems(trade.sellerUsername, trade.sellerItems);

      // when
      const isAvailable = await inventoryRepository.isTradeItemsAvailable(trade);

      // then
      expect(isAvailable).true;
    });

    it("should return false if items are not enough in any of the two accounts", async () => {
      // given
      const trade = new TradeBuilder().build();

      await inventoryRepository.addItems(trade.ownerUsername, trade.ownerItems);

      // when
      const isAvailable = await inventoryRepository.isTradeItemsAvailable(trade);

      // then
      expect(isAvailable).false;
    });
  });
})
