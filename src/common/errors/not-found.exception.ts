export class IError extends Error {
  status?: number;
}

export class NotFoundException extends IError {
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}
