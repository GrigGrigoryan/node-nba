import BaseError from './BaseError';
import { StatusCode } from '../../common/enums';

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(StatusCode.INTERNAL_SERVER_ERROR, true, message);
  }
}
