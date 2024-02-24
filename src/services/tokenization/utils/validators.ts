import {
  isEmail as isValidEmail,
  isNumberString,
  max,
  min,
  length,
} from 'class-validator';
import { Result, define } from 'superstruct';
import { validateCardWithLuhn } from './tokenization.utils';

export const isValidCvv = define('credit card cvv', (cvv: any): Result => {
  return isNumberString(cvv) && length(cvv, 3, 4);
});

export const isEmail = define(
  'email(gmail, hotmail, yahoo.es)',
  (email: any): Result => {
    return isValidEmail(email, {
      host_whitelist: ['hotmail.com', 'yahoo.es', 'gmail.com'],
    });
  },
);

export const isValidCard = define('credit card number', (card: any): Result => {
  if (!length(card, 15, 16)) return false;
  return validateCardWithLuhn(card);
});

export const isValidYear = define(
  'credit card expiration year',
  (year: any): Result => {
    const currentYear = new Date().getFullYear();
    return min(Number(year), currentYear) && max(Number(year), currentYear + 5);
  },
);

export const isValidMonth = define(
  'credit card expiration month',
  (month: any): Result => {
    return min(Number(month), 1) && max(Number(month), 12);
  },
);
