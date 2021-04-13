export abstract class InfectedRepository {
  public abstract reportInfected(reporterUsername: string, infectedUsername: string): Promise<void>;
  public abstract isInfected(username: string): Promise<boolean>;
}
