import assert from "assert";

export class Location {
  public static latitudeInterval = {
    min: -90,
    max: 90,
  };

  public static longitudeInterval = {
    min: -180,
    max: 180,
  }

  public readonly latitude: number;
  public readonly longitude: number;

  public constructor(latitude: number, longitude: number) {
    this.validatePosition(latitude, longitude);

    this.latitude = latitude;
    this.longitude = longitude;
  }

  private validatePosition(latitude: number, longitude: number): void {
    assert(
      latitude <= Location.latitudeInterval.max && latitude >= Location.latitudeInterval.min,
      "Invalid latitude"
    );
    assert(
      longitude <= Location.longitudeInterval.max && latitude >= Location.longitudeInterval.min,
      "Invalid longitude"
    );

  }
}
