import {SimpleReport} from "@src/reports/domain/contracts/simple-report";
import {ItemName} from "@src/inventory/domain/contracts/item-name";

interface AverageResources {
  name: ItemName;
  quantity: number;
}

interface Response {
  infectedAccountsPercentage: number,
  healthAccountsPercentage: number,
  averageResourcesPerAccount: AverageResources[],
  lostPointsDueInfectedAccounts: number
}

const percentageConversion = 100;
const defaultValue = 0;

export class GetSimpleReportResponse {
  public constructor(private readonly report: SimpleReport) {}

  public toPlain(): Response {
    return {
      infectedAccountsPercentage: this.getInfectedAccountsPercentage(),
      healthAccountsPercentage: this.getHealthAccountsPercentage(),
      averageResourcesPerAccount: this.getAverageResourcesPerAccount(),
      lostPointsDueInfectedAccounts: this.getLostPointsDueInfectedItems(),
    };
  }

  private getInfectedAccountsPercentage(): number {
    if (this.report.numberOfAccounts === defaultValue) {
      return defaultValue;
    }
    return (this.report.numberOfInfectedAccounts / this.report.numberOfAccounts) * percentageConversion;
  }

  private getHealthAccountsPercentage(): number {
    if (this.report.numberOfAccounts === defaultValue) {
      return defaultValue;
    }
    return (this.report.numberOfHealthAccounts / this.report.numberOfAccounts) * percentageConversion;
  }

  private getAverageResourcesPerAccount(): AverageResources[] {
    const numberOfAccounts = this.report.numberOfAccounts;
    if (numberOfAccounts === defaultValue) {
      return [];
    }
    return this.report.totalItems.map((item) => {
      return {
        name: item.name,
        quantity: item.quantity / numberOfAccounts
      };
    });
  }

  private getLostPointsDueInfectedItems(): number {
    return this.report.totalInfectedItems.reduce((points, item) => {
      const itemPoints = this.report.itemsPoints.find((itemPoints) => itemPoints.name === item.name)
      if(itemPoints === undefined) {
        return points;
      }
      return points + item.quantity * itemPoints.points;
    }, defaultValue);
  }
}
