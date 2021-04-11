import {InMemoryLocationRepository} from "@src/account/application/repositories/in-memory-location-repository";
import faker from "faker";
import {LocationBuilder} from "@tests/account/builders/location-builder";
import {expect} from "chai";

describe("InMemoryLocationRepository", () => {
  describe(".upsertLocation", () => {
    it("should create a location bound to a user", async () => {
      // given
      const username = faker.name.lastName();
      const location = new LocationBuilder().build();
      const locationRepository = new InMemoryLocationRepository();

      // when
      await locationRepository.upsertLocation(username, location);

      // then
      const result = await locationRepository.getLocation(username);
      expect(result).deep.equal(location);
    });

    it("should update user location if already exist", async () => {
      // given
      const username = faker.name.lastName();
      const initialLocation = new LocationBuilder().build();
      const newLocation = new LocationBuilder().build();
      const locationRepository = new InMemoryLocationRepository();

      await locationRepository.upsertLocation(username, initialLocation);

      // when
      await locationRepository.upsertLocation(username, newLocation);

      // then
      const result = await locationRepository.getLocation(username);
      expect(result).deep.equal(newLocation);
    })
  })
})
