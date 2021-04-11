import {Gender} from "@src/account/domain/contracts/gender";

export class Account {
  public constructor(
    public readonly username: string,
    public readonly name: string,
    public readonly birthday: Date,
    public readonly gender: Gender,
  ) {}
}
