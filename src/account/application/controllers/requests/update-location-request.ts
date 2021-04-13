import {IsNumber, IsString, Max, Min} from "class-validator";
import {Location} from "@src/account/domain/contracts/location";

export class UpdateLocationRequest {
  @IsString()
  public username!: string;

  @IsNumber()
  @Min(Location.latitudeInterval.min)
  @Max(Location.latitudeInterval.max)
  public latitude!: number;

  @IsNumber()
  @Min(Location.longitudeInterval.min)
  @Max(Location.longitudeInterval.max)
  public longitude!: number;

  public buildLocation(): Location {
    return new Location(
      this.latitude,
      this.longitude
    );
  }
}
