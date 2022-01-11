import BaseError from './BaseError';
import { StatusCode } from '../../common/enums';

export class Unauthorized extends BaseError {
  constructor(message?: string) {
    super(StatusCode.UNAUTHORIZED, true, message);
  }
}
