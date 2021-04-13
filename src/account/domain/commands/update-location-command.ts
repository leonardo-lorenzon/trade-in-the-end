import {inject, injectable} from "inversify";
import {LocationRepository} from "@src/account/domain/repositories/location-repository";
import {Location} from "@src/account/domain/contracts/location";
import {noop} from "@src/lib/noop";
import {DomainError} from "@src/common/domain-error";

@injectable()
export class UpdateLocationCommand {
  public onSuccess: () => void = noop;
  public onError: (error: DomainError) => void = noop;

  public constructor(
    @inject(LocationRepository) private readonly repository: LocationRepository,
  ) {}

  public async execute(username: string, location: Location): Promise<void> {
    try {
      await this.repository.upsertLocation(username, location);
      this.onSuccess();
    } catch (error: unknown) {
      if (error instanceof DomainError) {
        return this.onError(error);
      }
      throw error;
    }
  }
}
