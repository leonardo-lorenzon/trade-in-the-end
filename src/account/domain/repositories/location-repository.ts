import {Location} from "@src/account/domain/contracts/location";

export abstract class LocationRepository {
  public abstract upsertLocation(username: string, location: Location): Promise<void>;
}
