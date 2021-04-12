import {InMemoryLocationRepository} from "@src/account/application/repositories/in-memory-location-repository";
import faker from "faker";
import {LocationBuilder} from "@tests/account/builders/location-builder";
import {expect} from "chai";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";

describe("InMemoryLocationRepository", () => {
  let locationRepository: InMemoryLocationRepository;
  let database: InMemoryDatabase;
  beforeEach(() => {
    database = new InMemoryDatabase();
    locationRepository = new InMemoryLocationRepository(database);
  });

  describe(".upsertLocation", () => {
    it("should create a location bound to a user", async () => {
      // given
      const username = faker.name.lastName();
      const location = new LocationBuilder().build();

      // when
      await locationRepository.upsertLocation(username, location);

      // then
      const result = database.getLocation(username);
      expect(result).deep.equal(location);
    });

    it("should update user location if already exist", async () => {
      // given
      const username = faker.name.lastName();
      const initialLocation = new LocationBuilder().build();
      const newLocation = new LocationBuilder().build();

      await locationRepository.upsertLocation(username, initialLocation);

      // when
      await locationRepository.upsertLocation(username, newLocation);

      // then
      const result = await database.getLocation(username);
      expect(result).deep.equal(newLocation);
    })
  })
})
