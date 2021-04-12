import faker from "faker";
import {expect} from "chai";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";
import {ItemBuilder} from "@tests/inventory/builders/item-builder";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {ItemName} from "@src/inventory/domain/contracts/item-name";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";

describe("InMemoryInventoryRepository", () => {
  let addItemsRepository: InMemoryInventoryRepository;
  let database: InMemoryDatabase;
  beforeEach(() => {
    database = new InMemoryDatabase();
    addItemsRepository = new InMemoryInventoryRepository(database);
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
      await addItemsRepository.addItems(username, items);

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
        await addItemsRepository.addItems(username, items);
        await addItemsRepository.addItems(username, items);
        expect.fail("Should throw a domain error");
      } catch (error) {
        // then
        expect(error).instanceOf(DomainError);
        expect(error.code).equal(ERRORS.accountHasItems.code);
      }

    });
  })
})
