import {UpdateLocationCommandFixture} from "@tests/account/fixtures/update-location-command-fixture";
import faker from "faker";
import {LocationBuilder} from "@tests/account/builders/location-builder";
import { expect } from "chai";

describe("UpdateLocationCommand", () => {
  describe(".execute", () => {
    it("should update the user location", async () => {
      // when
      const username = faker.name.lastName();
      const oldLocation = new LocationBuilder().build();
      const newLocation = new LocationBuilder().build();
      const { command, repository, database } = new UpdateLocationCommandFixture();

      await repository.upsertLocation(username,oldLocation);

      // then
      await command.execute(username, newLocation);

      // then
      const locationOnDatabase = database.getLocation(username);
      expect(locationOnDatabase).equal(newLocation)
    })
  })
})
