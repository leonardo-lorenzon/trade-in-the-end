import {Account} from "@src/account/domain/contracts/account";

export abstract class AccountRepository {
  public abstract createAccount(account: Account): Promise<void>;
}
