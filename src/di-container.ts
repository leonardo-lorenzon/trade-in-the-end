import { Container } from "inversify";
import {CreateAccountCommand} from "@src/account/domain/commands/create-account-command";
import {CreateAccountController} from "@src/account/application/controllers/create-account-controller";
import {CreateAccountRepository} from "@src/account/domain/repositories/create-account-repository";
import {InMemoryAccountRepository} from "@src/account/application/repositories/in-memory-account-repository";
import {LocationRepository} from "@src/account/domain/repositories/location-repository";
import {InMemoryLocationRepository} from "@src/account/application/repositories/in-memory-location-repository";
import {AddItemsRepository} from "@src/inventory/domain/repositories/add-items-repository";
import {InMemoryInventoryRepository} from "@src/inventory/application/repositories/in-memory-inventory-repository";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import {ReportInfectionCommand} from "@src/account/domain/commands/report-infection-command";
import {ReportInfectionController} from "@src/account/application/controllers/report-infection-controller";
import {InfectionRepository} from "@src/account/domain/repositories/infection-repository";
import {InMemoryInfectedRepository} from "@src/account/application/repositories/in-memory-infected-repository";
import {UpdateLocationCommand} from "@src/account/domain/commands/update-location-command";
import {UpdateLocationController} from "@src/account/application/controllers/update-location-controller";
import {TradeItemsRepository} from "@src/inventory/domain/repositories/trade-items-repository";
import {TradeItemsController} from "@src/inventory/application/controllers/trade-items-controller";
import {TradeItemsCommand} from "@src/inventory/domain/commands/trade-items-command";
import {AccountInformationRepository} from "@src/account/domain/repositories/account-information-repository";
import {ReportsService} from "@src/reports/domain/services/reports-service";
import {InMemoryReportService} from "@src/reports/application/services/in-memory-report-service";
import {GetSimpleReportCommand} from "@src/reports/domain/commands/get-simple-report-command";
import {GetSimpleReportController} from "@src/reports/application/controllers/get-simple-report-controller";
import {InventoryInformationRepository} from "@src/inventory/domain/repositories/inventory-information-repository";

const diContainer = new Container();

// account
diContainer.bind(CreateAccountCommand).toSelf();
diContainer.bind(CreateAccountController).toSelf();
diContainer.bind(CreateAccountRepository).to(InMemoryAccountRepository);
diContainer.bind(AccountInformationRepository).to(InMemoryAccountRepository);
diContainer.bind(LocationRepository).to(InMemoryLocationRepository);
diContainer.bind(ReportInfectionCommand).toSelf();
diContainer.bind(ReportInfectionController).toSelf();
diContainer.bind(InfectionRepository).to(InMemoryInfectedRepository);
diContainer.bind(UpdateLocationCommand).toSelf();
diContainer.bind(UpdateLocationController).toSelf();

// inventory
diContainer.bind(AddItemsRepository).to(InMemoryInventoryRepository);
diContainer.bind(TradeItemsRepository).to(InMemoryInventoryRepository);
diContainer.bind(InventoryInformationRepository).to(InMemoryInventoryRepository);
diContainer.bind(TradeItemsController).toSelf();
diContainer.bind(TradeItemsCommand).toSelf();

// reports
diContainer.bind(ReportsService).to(InMemoryReportService);
diContainer.bind(GetSimpleReportCommand).toSelf();
diContainer.bind(GetSimpleReportController).toSelf();

// in memory database
diContainer.bind(InMemoryDatabase).toSelf().inSingletonScope();

export { diContainer }
