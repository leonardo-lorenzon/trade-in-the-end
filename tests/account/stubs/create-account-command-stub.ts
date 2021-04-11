import {CreateAccountCommand} from "@src/account/domain/commands/create-account-command";

export class CreateAccountCommandStub extends CreateAccountCommand {
  private callback!: () => void;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_a: unknown): Promise<void> {
    this.callback()
  }

  public withSuccess(account: unknown): CreateAccountCommandStub {
    this.callback = () => this.onSuccess(account);

    return this;
  }

}
