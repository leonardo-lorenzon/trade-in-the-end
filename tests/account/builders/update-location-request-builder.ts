import {BaseBuilder} from "@tests/utils/base-builder";
import {UpdateLocationRequest} from "@src/account/application/controllers/requests/update-location-request";
import faker from "faker";
import {LocationBuilder} from "@tests/account/builders/location-builder";

export class UpdateLocationRequestBuilder extends BaseBuilder<UpdateLocationRequest, UpdateLocationRequestBuilder>{
  public constructor() {
    super(UpdateLocationRequestBuilder);
  }

  protected buildDefault(): UpdateLocationRequest {
    const request = new UpdateLocationRequest();

    const location = new LocationBuilder().build();
    request.username = faker.name.lastName();
    request.latitude = location.latitude;
    request.longitude = location.longitude;

    return request;
  }

}
