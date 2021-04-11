import assert from "assert";

export class Location {
  public readonly latitude: number;
  public readonly longitude: number;

  public constructor(latitude: number, longitude: number) {
    this.validatePosition(latitude, longitude);

    this.latitude = latitude;
    this.longitude = longitude;
  }

  private validatePosition(latitude: number, longitude: number): void {
    assert(latitude <= 90 && latitude >= -90, "Invalid latitude")
    assert(longitude <= 180 && latitude >= -180, "Invalid longitude")

  }
}
