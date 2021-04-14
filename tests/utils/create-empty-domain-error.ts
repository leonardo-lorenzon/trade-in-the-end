import {DomainError} from "@src/common/domain-error";

export const createEmptyDomainError = (): DomainError => new DomainError({code: "", message: "s"});
