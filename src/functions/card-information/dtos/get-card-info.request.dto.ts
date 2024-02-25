import { assert, object } from 'superstruct';
import { isValidToken } from '../utils/validators.utils';

export class GetCardInfoRequest {
  readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public isValid(): void {
    assert(this, object({ token: isValidToken }));
  }
}
