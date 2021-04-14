import {
  INFECTED_THRESHOLD,
  InMemoryInfectedRepository
} from "@src/account/application/repositories/in-memory-infected-repository";
import {InMemoryDatabase} from "@src/in-memory-database/in-memory-database";
import { expect } from "chai";
import faker from "faker";
import {DomainError} from "@src/common/domain-error";
import {ERRORS} from "@src/common/errors";

describe("InMemoryInfectedRepository", () => {
  let infectedRepository: InMemoryInfectedRepository;
  beforeEach(() => {
    infectedRepository = new InMemoryInfectedRepository(new InMemoryDatabase());
  })

  describe(".isInfected", () => {
    it(`should return true when at least ${INFECTED_THRESHOLD} others report a infection`, async () => {
      // given
      const username = faker.name.lastName();

      // when
      for (let i = 0; i < INFECTED_THRESHOLD; i++) {
        const reporterUsername = `Jose ${i}`;
        await infectedRepository.reportInfection(reporterUsername, username);
      }

      const isInfected = await infectedRepository.isInfected(username)

      // then
      expect(isInfected).true;
    });
  });

  describe(".reportInfection", () => {
    it("should throw a domain error when a infected user try to report others", async () => {
      // given
      const reporterInfected = faker.name.lastName();
      const otherUsername = faker.name.lastName();

      // infect reporterInfected
      for (let i = 0; i < INFECTED_THRESHOLD; i++) {
        const reporterUsername = `Jose ${i}`;
        await infectedRepository.reportInfection(reporterUsername, reporterInfected);
      }


      try {
        await infectedRepository.reportInfection(reporterInfected, otherUsername);
        expect.fail();
      } catch (error) {
        expect(error).instanceOf(DomainError);
        expect(error.code).equal(ERRORS.infectedAccount.code);
      }
    });

    it("should throw a error when try to report the same account twice", async () => {
      // given
      const reporterUsername = faker.name.lastName();
      const infectedUsername = faker.name.lastName();

      try {
        await infectedRepository.reportInfection(reporterUsername, infectedUsername);
        await infectedRepository.reportInfection(reporterUsername, infectedUsername);
        expect.fail();
      } catch (error) {
        expect(error).instanceOf(DomainError);
        expect(error.code).equal(ERRORS.cannotReportTwice.code);
      }
    });
  })
})
