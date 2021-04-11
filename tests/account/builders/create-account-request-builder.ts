import {BaseBuilder} from "@tests/utils/base-builder";
import {CreateAccountRequest} from "@src/account/application/controllers/requests/create-account-request";
import faker from "faker";
import {Gender} from "@src/account/domain/contracts/gender";

export class CreateAccountRequestBuilder extends BaseBuilder<CreateAccountRequest, CreateAccountRequestBuilder>{
  public constructor() {
    super(CreateAccountRequestBuilder);
  }

  protected buildDefault(): CreateAccountRequest {
    const request = new CreateAccountRequest()

    request.username = faker.name.lastName();
    request.name = faker.name.findName();
    request.birthday = new Date().toISOString();
    request.gender = faker.random.arrayElement(Object.values(Gender));
    request.latitude = faker.datatype.number({min: -90, max: 90});
    request.longitude = faker.datatype.number({min: -180, max: 180});
    request.items = [];

    return request;
  }

}
