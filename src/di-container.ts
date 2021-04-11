import { Container } from "inversify";
import {CreateAccountCommand} from "@src/account/domain/commands/create-account-command";
import {CreateAccountController} from "@src/account/application/controllers/create-account-controller";

const diContainer = new Container();

diContainer.bind(CreateAccountCommand).toSelf();
diContainer.bind(CreateAccountController).toSelf();

export { diContainer }
