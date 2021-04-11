import faker from "faker";
import {InMemoryAddItemsRepository} from "@src/inventory/application/repositories/in-memory-add-items-repository";
import {ItemBuilder} from "@tests/inventory/builders/item-builder";

describe("InMemoryAddItemsRepository", () => {
  describe(".addItems", () => {
    it("should add items to a user", async () => {
      // given
      const username = faker.name.lastName();
      const numberOfItems = 3;
      const items = new ItemBuilder().buildMany(numberOfItems);
      const addItemsRepository = new InMemoryAddItemsRepository();

      // when
      await addItemsRepository.addItems(username, items);
    })
  })
})
