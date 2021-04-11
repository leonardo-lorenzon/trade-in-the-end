import {BaseBuilder} from "@tests/utils/base-builder";
import {Account} from "@src/account/domain/contracts/account";
import faker from "faker";
import {Gender} from "@src/account/domain/contracts/gender";

export class AccountBuilder extends BaseBuilder<Account, AccountBuilder> {
  public constructor() {
    super(AccountBuilder);
  }

  protected buildDefault(): Account {
    return new Account(
      faker.name.lastName(),
      faker.name.findName(),
      new Date(),
      faker.random.arrayElement(Object.values(Gender))
    );
  }

}
