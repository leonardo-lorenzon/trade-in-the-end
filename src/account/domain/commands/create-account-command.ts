import {injectable} from "inversify";

@injectable()
export class CreateAccountCommand {
  public onSuccess!: (account: unknown) => void;

  public async execute(account: unknown): Promise<void> {
    this.onSuccess(account);
  }
}
