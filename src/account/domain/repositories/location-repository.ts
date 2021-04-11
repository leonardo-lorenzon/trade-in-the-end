import {Location} from "@src/account/domain/contracts/location";
import {Uuid} from "@src/lib/uuid";

export abstract class LocationRepository {
  public abstract upsertLocation(accountId: Uuid, location: Location): Promise<void>;
}
