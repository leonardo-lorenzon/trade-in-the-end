import {InMemoryAccountRepository} from "@src/account/application/repositories/in-memory-account-repository";
import {AccountBuilder} from "@tests/account/builders/account-builder";
import {expect} from "chai";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";

describe("InMemoryAccountRepository", () => {
  let accountRepository: InMemoryAccountRepository;
  let database: InMemoryDatabase;
  beforeEach(() => {
    database = new InMemoryDatabase();
    accountRepository = new InMemoryAccountRepository(database);
  })

  describe(".createAccount", () => {
    it("should create an account if not exist", async () => {
      // given
      const account =  new AccountBuilder().build();

      // when
      await accountRepository.createAccount(account);

      // then
      const hasAccount = database.hasAccount(account.username);
      expect(hasAccount).true;
    })

    it("should throw a domain error if try to create an account with existent username", async () => {
      // given
      const account =  new AccountBuilder().build();

      try {
        // when
        await accountRepository.createAccount(account);
        await accountRepository.createAccount(account);
        expect.fail("should throw an error")
      } catch (error) {
        //then
        expect(error).instanceOf(DomainError);
        expect(error.code).equal(ERRORS.usernameAlreadyExist.code);
      }
    })
  });

  describe(".getNumberOfAccounts", () => {
    it("should return the number of existent accounts", async () => {
      // given
      const account =  new AccountBuilder().build();
      await accountRepository.createAccount(account);

      // when
      const numberOfAccounts = await accountRepository.getNumberOfAccounts();
      const expected = 1;

      // then
      expect(numberOfAccounts).equal(expected);
    })
  })
})
