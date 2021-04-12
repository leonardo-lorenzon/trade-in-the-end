import {LocationRepository} from "@src/account/domain/repositories/location-repository";
import {Location} from "@src/account/domain/contracts/location";
import {inject, injectable} from "inversify";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";

@injectable()
export class InMemoryLocationRepository implements LocationRepository {
  public constructor(
    @inject(InMemoryDatabase) private readonly database: InMemoryDatabase,
  ) {}

  public async upsertLocation(username: string, location: Location): Promise<void> {
    this.database.upsertLocation(username, location);
  }

}
