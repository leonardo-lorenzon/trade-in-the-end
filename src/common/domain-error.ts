export interface Error {
  code: string,
  message: string,
}

export class DomainError extends Error {
  public readonly code: string;
  public readonly message: string;

  public constructor(error: Error) {
    super(error.message);

    this.code = error.code;
    this.message = error.message;
  }

  public toPlain(): unknown {
    return {
      code: this.code,
      message: this.message
    }
  }
}
