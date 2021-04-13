import {CreateAccountCommandFixture} from "@tests/account/fixtures/create-account-command-fixture";
import {AccountBuilder} from "@tests/account/builders/account-builder";
import {LocationBuilder} from "@tests/account/builders/location-builder";
import {ItemBuilder} from "@tests/inventory/builders/item-builder";
import {expect} from "chai";

describe("CreateAccountCommand", () => {
  describe(".execute", () => {
    it("should create an account with location and items on inventory", async () => {
      // given
      const numberOfItems = 1;
      const { command, database } = new CreateAccountCommandFixture();
      const account = new AccountBuilder().build();
      const location = new LocationBuilder().build();
      const items = new ItemBuilder()
        .buildMany(numberOfItems);

      // when
      await command.execute(account, location, items);

      // then
      const accountOnDatabaseExist = database.hasAccount(account.username)
      const locationOnDatabase = database.getLocation(account.username);
      const itemsOnDatabase = database.retrieveItems(account.username);

      expect(accountOnDatabaseExist).true;
      expect(locationOnDatabase).deep.equal(location);
      expect(itemsOnDatabase).deep.equal(items);
    });
  });
})
