import faker from "faker";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";
import {ItemBuilder} from "@tests/inventory/builders/item-builder";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";

describe("InMemoryInventoryRepository", () => {
  let addItemsRepository: InMemoryInventoryRepository;
  beforeEach(() => {
    addItemsRepository = new InMemoryInventoryRepository(new InMemoryDatabase());
  });

  describe(".addItems", () => {
    it("should add items to a user", async () => {
      // given
      const username = faker.name.lastName();
      const numberOfItems = 3;
      const items = new ItemBuilder().buildMany(numberOfItems);

      // when
      await addItemsRepository.addItems(username, items);
    })
  })
})
