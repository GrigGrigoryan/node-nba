import BaseError from './BaseError';
import { StatusCode } from '../../common/enums';

export class NotFound extends BaseError {
  constructor(message?: string) {
    super(StatusCode.NOT_FOUND, true, message);
  }
}
