import { assert, object } from 'superstruct';
import {
  isEmail,
  isValidCard,
  isValidCvv,
  isValidMonth,
  isValidYear,
} from '../utils/validators';

export type ICreateTokenRequest = {
  readonly card_number: string;
  readonly cvv: string;
  readonly expiration_month: string;
  readonly expiration_year: string;
  readonly email: string;
};

export class CreateTokenRequest {
  readonly card_number: string;
  readonly cvv: string;
  readonly expiration_month: string;
  readonly expiration_year: string;
  readonly email: string;

  constructor(data: ICreateTokenRequest) {
    this.card_number = data.card_number;
    this.cvv = data.cvv;
    this.expiration_month = data.expiration_month;
    this.expiration_year = data.expiration_year;
    this.email = data.email;
  }

  public isValid(): void {
    assert(
      this,
      object({
        card_number: isValidCard,
        cvv: isValidCvv,
        expiration_month: isValidMonth,
        expiration_year: isValidYear,
        email: isEmail,
      }),
    );
  }
}
