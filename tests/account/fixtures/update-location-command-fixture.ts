import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {UpdateLocationCommand} from "@src/account/domain/commands/update-location-command";
import {InMemoryLocationRepository} from "@src/account/application/repositories/in-memory-location-repository";

export class UpdateLocationCommandFixture {
  public database = new InMemoryDatabase();
  public repository = new InMemoryLocationRepository(this.database);

  public get command(): UpdateLocationCommand {
    return new UpdateLocationCommand(this.repository)
  }
}
