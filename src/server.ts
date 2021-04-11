import "module-alias/register";
import "reflect-metadata";

import {diContainer} from "@src/di-container";

import {createExpressServer, useContainer} from 'routing-controllers';
import {CreateAccountController} from "@src/account/application/controllers/create-account-controller";

useContainer(diContainer);

const app = createExpressServer({
  controllers: [CreateAccountController],
});

const port = 5000;

app.listen(port, () => {
  console.info(`server running on port ${port}`);
});
