import {inject, injectable} from "inversify";
import {AccountRepository} from "@src/account/domain/repositories/account-repository";
import {Account} from "@src/account/domain/contracts/account";
import {LocationRepository} from "@src/account/domain/repositories/location-repository";
import {Location} from "@src/account/domain/contracts/location";
import {AddItemsRepository} from "@src/inventory/domain/repositories/add-items-repository";
import {Item} from "@src/inventory/domain/contracts/item";

@injectable()
export class CreateAccountCommand {
  public onSuccess!: (account: Account) => void;

  public constructor(
    @inject(AccountRepository) private readonly accountRepository: AccountRepository,
    @inject(LocationRepository) private readonly locationRepository: LocationRepository,
    @inject(AddItemsRepository) private readonly addItemsRepository: AddItemsRepository,
  ) {}

  public async execute(account: Account, location: Location, items: Item[]): Promise<void> {
    // TODO need idempotency mechanism to retry if the first request was completed.
    await this.accountRepository.createAccount(account);
    await this.locationRepository.upsertLocation(account.id, location)
    await this.addItemsRepository.addItems(account.id, items);

    this.onSuccess(account);
  }
}
