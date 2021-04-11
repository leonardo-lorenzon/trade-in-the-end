import {inject, injectable} from "inversify";
import {CreateAccountRepository} from "@src/account/domain/repositories/create-account-repository";
import {Account} from "@src/account/domain/contracts/account";
import {LocationRepository} from "@src/account/domain/repositories/location-repository";
import {Location} from "@src/account/domain/contracts/location";
import {AddItemsRepository} from "@src/inventory/domain/repositories/add-items-repository";
import {Item} from "@src/inventory/domain/contracts/item";
import {DomainError} from "@src/common/domain-error";

@injectable()
export class CreateAccountCommand {
  public onSuccess!: (account: Account) => void;
  public onError!: (error: DomainError) => void;

  public constructor(
    @inject(CreateAccountRepository) private readonly createAccountRepository: CreateAccountRepository,
    @inject(LocationRepository) private readonly locationRepository: LocationRepository,
    @inject(AddItemsRepository) private readonly addItemsRepository: AddItemsRepository,
  ) {}

  public async execute(account: Account, location: Location, items: Item[]): Promise<void> {
    // TODO need idempotency mechanism to retry if the first request was completed.
    try {
      await this.createAccountRepository.createAccount(account);
      await this.locationRepository.upsertLocation(account.username, location)
      await this.addItemsRepository.addItems(account.username, items);

      this.onSuccess(account);
    } catch (error) {
      if (error instanceof DomainError) {
        return this.onError(error)
      }

      throw error;
    }
  }
}
