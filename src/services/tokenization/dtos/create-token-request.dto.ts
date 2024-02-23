export type CreateTokenRequest = {
  readonly card_number: string;
  readonly cvv: number;
  readonly expiration_month: string;
  readonly expiration_year: number;
  readonly email: string;
};
