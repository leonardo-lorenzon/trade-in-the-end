import {UpdateLocationController} from "@src/account/application/controllers/update-location-controller";
import {UpdateLocationCommandFixture} from "@tests/account/fixtures/update-location-command-fixture";

export class UpdateLocationControllerFixture {
  public fixture = new UpdateLocationCommandFixture()

  public get controller(): UpdateLocationController {
    return new UpdateLocationController(this.fixture.command)
  }
}
