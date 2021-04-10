import "reflect-metadata";

import { createExpressServer } from 'routing-controllers';
import {CreateAccountController} from "../src/account/application/controllers/create-account-controller";

const app = createExpressServer({
  controllers: [CreateAccountController],
});

app.listen(5000);
