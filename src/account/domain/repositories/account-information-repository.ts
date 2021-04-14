export abstract class AccountInformationRepository {
  public abstract getNumberOfAccounts(): Promise<number>;
}
