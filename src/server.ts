import "module-alias/register";
import "reflect-metadata";

import {diContainer} from "@src/di-container";

import {createExpressServer, useContainer} from 'routing-controllers';
import {CreateAccountController} from "@src/account/application/controllers/create-account-controller";
import {ReportInfectionController} from "@src/account/application/controllers/report-infection-controller";
import {UpdateLocationController} from "@src/account/application/controllers/update-location-controller";

useContainer(diContainer);

const app = createExpressServer({
  controllers: [
    CreateAccountController,
    ReportInfectionController,
    UpdateLocationController,
  ],
});

const port = 5000;

app.listen(port, () => {
  console.info(`server running on port ${port}`);
});
