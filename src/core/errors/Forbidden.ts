import BaseError from './BaseError';
import { StatusCode } from '../../common/enums';

export class Forbidden extends BaseError {
  constructor(message?: string) {
    super(StatusCode.FORBIDDEN, true, message);
  }
}
