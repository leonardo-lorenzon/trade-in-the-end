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

const diContainer = new Container();

// account
diContainer.bind(CreateAccountCommand).toSelf();
diContainer.bind(CreateAccountController).toSelf();
diContainer.bind(CreateAccountRepository).to(InMemoryAccountRepository);
diContainer.bind(LocationRepository).to(InMemoryLocationRepository);
diContainer.bind(ReportInfectionCommand).toSelf();
diContainer.bind(ReportInfectionController).toSelf();
diContainer.bind(InfectionRepository).to(InMemoryInfectedRepository);

// inventory
diContainer.bind(AddItemsRepository).to(InMemoryInventoryRepository);

// in memory database
diContainer.bind(InMemoryDatabase).toSelf().inSingletonScope();

export { diContainer }
