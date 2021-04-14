import {Account} from "@src/account/domain/contracts/account";

export abstract class InfectionRepository {
  public abstract reportInfection(reporterUsername: string, infectedUsername: string): Promise<void>;
  public abstract isInfected(username: string): Promise<boolean>;
  public abstract getInfectedAccounts(): Promise<Account[]>;
}
