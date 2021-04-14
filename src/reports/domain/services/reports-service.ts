import {SimpleReport} from "@src/reports/domain/contracts/simple-report";

export abstract class ReportsService {
  public abstract getSimpleReport(): Promise<SimpleReport>;
}
