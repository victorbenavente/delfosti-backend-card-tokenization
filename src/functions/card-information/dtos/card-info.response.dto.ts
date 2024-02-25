export interface ICardInfoResponse {
  readonly card_number: string;
  readonly expiration_month: string;
  readonly expiration_year: string;
  readonly email: string;
  readonly cvv: string;
}
export class CardInfoResponse {
  readonly card_number: string;
  readonly expiration_month: string;
  readonly expiration_year: string;
  readonly email: string;

  constructor(data: ICardInfoResponse) {
    this.card_number = data.card_number;
    this.email = data.email;
    this.expiration_month = data.expiration_month;
    this.expiration_year = data.expiration_year;
  }
}
