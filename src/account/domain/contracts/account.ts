import {Gender} from "@src/account/domain/contracts/gender";
import {Uuid} from "@src/lib/uuid";

export class Account {
  public constructor(
    public readonly id: Uuid,
    public readonly name: string,
    public readonly birthday: Date,
    public readonly gender: Gender,
  ) {}
}
