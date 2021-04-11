import {BaseBuilder} from "@tests/utils/base-builder";
import {Location} from "@src/account/domain/contracts/location";
import faker from "faker";

export class LocationBuilder extends BaseBuilder<Location, LocationBuilder>{
  public constructor() {
    super(LocationBuilder);
  }

  protected buildDefault(): Location {
    return new Location(
      faker.datatype.number({min: -90, max: 90}),
      faker.datatype.number({min: -180, max: 180}),
    );
  }

}
