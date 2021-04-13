import {inject, injectable} from "inversify";
import {InfectionRepository} from "@src/account/domain/repositories/infection-repository";
import {noop} from "@src/lib/noop";
import {DomainError} from "@src/common/domain-error";

@injectable()
export class ReportInfectionCommand {
  public onSuccess: () => void = noop;
  public onError: (error: DomainError) => void = noop;
  public constructor(
    @inject(InfectionRepository) private readonly repository: InfectionRepository,
  ) {}
  public async execute(reporterUsername: string, infectedUsername: string): Promise<void> {
    try {
      await this.repository.reportInfection(reporterUsername, infectedUsername);
      this.onSuccess();
    } catch (error: unknown) {
      if (error instanceof DomainError) {
        return this.onError(error);
      }
      throw error;
    }
  }
}
