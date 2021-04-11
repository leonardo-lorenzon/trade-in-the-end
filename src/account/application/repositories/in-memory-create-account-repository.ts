import {CreateAccountRepository} from "@src/account/domain/repositories/create-account-repository";
import {injectable} from "inversify";
import {Account} from "@src/account/domain/contracts/account";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";

@injectable()
export class InMemoryCreateAccountRepository implements CreateAccountRepository {
  private readonly accounts: Map<string, Account> = new Map<string, Account>();

  public async createAccount(account: Account): Promise<void> {
    if (this.accounts.has(account.username)) {
      throw new DomainError(ERRORS.usernameAlreadyExist);
    }

    this.accounts.set(account.username, account)
  }

}
