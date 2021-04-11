import {Account} from "@src/account/domain/contracts/account";

interface Response {
  username: string;
}

export class CreateAccountResponse {
  public constructor(
    private readonly account: Account,
  ) {}

  public toPlain(): Response {
    return {
      username: this.account.username,
    };
  }
}
