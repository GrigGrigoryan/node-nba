import BaseError from './BaseError';
import { StatusCode } from '../../common/enums';

export class Conflict extends BaseError {
  constructor(message?: string) {
    super(StatusCode.CONFLICT, true, message);
  }
}
