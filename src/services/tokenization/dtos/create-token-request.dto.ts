export type CreateTokenRequest = {
  readonly card_number: string;
  readonly cvv: string;
  readonly expiration_month: string;
  readonly expiration_year: string;
  readonly email: string;
};
