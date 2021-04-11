import {Account} from "@src/account/domain/contracts/account";

export abstract class CreateAccountRepository {
  public abstract createAccount(account: Account): Promise<void>;
}
