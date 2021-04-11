import { Container } from "inversify";
import {CreateAccountCommand} from "@src/account/domain/commands/create-account-command";
import {CreateAccountController} from "@src/account/application/controllers/create-account-controller";
import {CreateAccountRepository} from "@src/account/domain/repositories/create-account-repository";
import {InMemoryCreateAccountRepository} from "@src/account/application/repositories/in-memory-create-account-repository";
import {LocationRepository} from "@src/account/domain/repositories/location-repository";
import {InMemoryLocationRepository} from "@src/account/application/repositories/in-memory-location-repository";
import {AddItemsRepository} from "@src/inventory/domain/repositories/add-items-repository";
import {InMemoryAddItemsRepository} from "@src/inventory/application/repositories/in-memory-add-items-repository";

const diContainer = new Container();

// account
diContainer.bind(CreateAccountCommand).toSelf();
diContainer.bind(CreateAccountController).toSelf();
diContainer.bind(CreateAccountRepository).to(InMemoryCreateAccountRepository).inSingletonScope();
diContainer.bind(LocationRepository).to(InMemoryLocationRepository).inSingletonScope();

// inventory
diContainer.bind(AddItemsRepository).to(InMemoryAddItemsRepository).inSingletonScope();

export { diContainer }
