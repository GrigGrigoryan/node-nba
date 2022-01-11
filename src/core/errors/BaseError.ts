import { StatusCode } from '../../common/enums';

export default class BaseError extends Error {
  protected statusCode: StatusCode;
  protected status: string;
  protected isOperational: boolean;

  constructor(statusCode: StatusCode, isOperational: boolean, message?: string) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
