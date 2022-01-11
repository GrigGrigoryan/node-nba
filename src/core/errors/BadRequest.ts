import BaseError from './BaseError';
import { StatusCode } from '../../common/enums';

export class BadRequest extends BaseError {
  constructor(message?: string) {
    super(StatusCode.BAD_REQUEST, true, message);
  }
}
