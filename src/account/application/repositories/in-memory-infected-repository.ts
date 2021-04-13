import {inject, injectable} from "inversify";
import {InfectedRepository} from "@src/account/domain/repositories/infected-repository";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";

export const INFECTED_THRESHOLD = 5;

@injectable()
export class InMemoryInfectedRepository implements InfectedRepository {
  public constructor(
    @inject(InMemoryDatabase) private readonly database: InMemoryDatabase,
  ) {}

  public async isInfected(username: string): Promise<boolean> {
    const reporters = this.database.getReportersForUsername(username);

    return reporters.length >= INFECTED_THRESHOLD;
  }

  public async reportInfected(reporterUsername: string, infectedUsername: string): Promise<void> {
    if (await this.isInfected(reporterUsername)) {
      throw new DomainError(ERRORS.infectedAccount)
    }

    // TODO refactor to call getReportersForUsername once
    const reporters = this.database.getReportersForUsername(infectedUsername);
    if (reporters.includes(reporterUsername)) {
      throw new DomainError(ERRORS.cannotReportTwice);
    }

    return this.database.reportInfectedUsername(reporterUsername, infectedUsername);
  }

}
