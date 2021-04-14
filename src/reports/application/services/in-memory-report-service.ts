import {ReportsService} from "@src/reports/domain/services/reports-service";
import {SimpleReport} from "@src/reports/domain/contracts/simple-report";
import {inject, injectable} from "inversify";
import {AccountInformationRepository} from "@src/account/domain/repositories/account-information-repository";
import {InfectionRepository} from "@src/account/domain/repositories/infection-repository";
import {InventoryInformationRepository} from "@src/inventory/domain/repositories/inventory-information-repository";

@injectable()
export class InMemoryReportService implements ReportsService {
  public constructor(
    @inject(AccountInformationRepository) private readonly accountInformationRepository: AccountInformationRepository,
    @inject(InfectionRepository) private readonly infectionRepository: InfectionRepository,
    @inject(InventoryInformationRepository) private readonly inventoryInformationRepository: InventoryInformationRepository,
  ) {}

  public async getSimpleReport(): Promise<SimpleReport> {
    const numberOfAccounts = await this.accountInformationRepository.getNumberOfAccounts();
    const infectedAccounts = await this.infectionRepository.getInfectedAccounts();
    const numberOfInfectedAccounts = infectedAccounts.length;
    const numberOfHealthAccounts = numberOfAccounts - numberOfInfectedAccounts;
    const totalItems = await this.inventoryInformationRepository.getInventory();
    const totalInfectedItems = await this.inventoryInformationRepository.getAllItemsFromAccounts(infectedAccounts);
    const itemsPoints = await this.inventoryInformationRepository.getItemsPoints();

    return new SimpleReport(
      numberOfAccounts,
      numberOfHealthAccounts,
      numberOfInfectedAccounts,
      totalItems,
      totalInfectedItems,
      itemsPoints,
    )
  }

}
