import {InMemoryAccountRepository} from "@src/account/application/repositories/in-memory-account-repository";
import {AccountBuilder} from "@tests/account/builders/account-builder";
import {expect} from "chai";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";

describe("InMemoryAccountRepository", () => {
  let createAccountRepository: InMemoryAccountRepository;
  beforeEach(() => {
    createAccountRepository = new InMemoryAccountRepository(new InMemoryDatabase());
  })

  describe(".createAccount", () => {
    it("should create an account if not exist", async () => {
      // given
      const account =  new AccountBuilder().build();

      try {
        // when
        await createAccountRepository.createAccount(account);
      } catch (e) {
        // then
        expect.fail("Unexpected error trying create an account")
      }
    })

    it("should throw a domain error if try to create an account with existent username", async () => {
      // given
      const account =  new AccountBuilder().build();

      try {
        // when
        await createAccountRepository.createAccount(account);
        await createAccountRepository.createAccount(account);
        expect.fail("should throw an error")
      } catch (error) {
        //then
        expect(error).instanceOf(DomainError);
        expect(error.code).equal(ERRORS.usernameAlreadyExist.code);
      }
    })
  })
})
