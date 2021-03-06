import {CreateAccountRepository} from "@src/account/domain/repositories/create-account-repository";
import {inject, injectable} from "inversify";
import {Account} from "@src/account/domain/contracts/account";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {AccountInformationRepository} from "@src/account/domain/repositories/account-information-repository";

@injectable()
export class InMemoryAccountRepository implements CreateAccountRepository, AccountInformationRepository {
  public constructor(
    @inject(InMemoryDatabase) private readonly database: InMemoryDatabase,
  ) {}

  public async createAccount(account: Account): Promise<void> {
    if (this.database.hasAccount(account.username)) {
      throw new DomainError(ERRORS.usernameAlreadyExist);
    }

    this.database.insertAccount(account);
  }

  public async getNumberOfAccounts(): Promise<number> {
    return this.database.getNumberOfAccounts();
  }

}
