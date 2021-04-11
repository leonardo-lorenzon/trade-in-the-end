import {LocationRepository} from "@src/account/domain/repositories/location-repository";
import {Location} from "@src/account/domain/contracts/location";
import {injectable} from "inversify";

@injectable()
export class InMemoryLocationRepository implements LocationRepository {
  private readonly locations: Map<string, Location> = new Map<string, Location>();

  public async upsertLocation(username: string, location: Location): Promise<void> {
    this.locations.set(username, location);
  }

  // TODO find a new way to test without create a public method only for test
  public async getLocation(username: string): Promise<Location|undefined> {
    return this.locations.get(username);
  }

}
