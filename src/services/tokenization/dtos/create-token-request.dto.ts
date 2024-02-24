import { IsEmail, IsNumberString, Length, Max, Min } from 'class-validator';
import { IsValidCard, IsValidYear } from '../../../common/decorators';

export class CreateTokenRequest {
  constructor(
    card_number: string,
    cvv: string,
    expiration_month: string,
    expiration_year: string,
    email: string,
  ) {
    this.card_number = card_number;
    this.cvv = cvv;
    this.expiration_year = expiration_year;
    this.expiration_month = expiration_month;
    this.email = email;
  }

  @IsNumberString()
  @IsValidCard()
  public card_number: string;

  @IsNumberString()
  @Length(3, 4)
  public cvv: string;

  @IsNumberString()
  @Min(1)
  @Max(12)
  public expiration_month: string;

  @IsNumberString()
  @IsValidYear()
  public expiration_year: string;

  @IsEmail({ host_whitelist: ['gmail.com', 'hotmail.com', 'yahoo.es'] })
  public email: string;
}
