export abstract class InfectionRepository {
  public abstract reportInfection(reporterUsername: string, infectedUsername: string): Promise<void>;
  public abstract isInfected(username: string): Promise<boolean>;
}
