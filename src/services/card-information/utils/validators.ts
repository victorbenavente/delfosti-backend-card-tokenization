import { Result, define } from 'superstruct';

export const isValidToken = define('culqi token of 16 char.', (token: any): Result => {
  const validToken = /^[a-zA-Z0-9]{16}$/;
  const pattern = new RegExp(validToken);
  return pattern.test(token);
});
