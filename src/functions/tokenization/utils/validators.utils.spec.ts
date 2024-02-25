import { StructError } from 'superstruct';
import {
  isValidCard,
  isValidCvv,
  isValidEmail,
  isValidMonth,
  isValidYear,
} from './validators.utils';

describe('validators-utils', () => {
  describe('isValidCvv', () => {
    it('should return an Object with cvv property when cvv is valid', () => {
      const cvv = '234';

      const result = isValidCvv.validate(cvv);

      expect(result).toEqual([undefined, cvv]);
    });
    it('should return a StructError with error message when token is not valid', () => {
      const cvv = '000000';

      const result = isValidCvv.validate(cvv);

      expect(result).toEqual([expect.any(StructError), undefined]);
      expect(result[0]).toBeInstanceOf(StructError);
      expect(result[0]).toHaveProperty(
        'message',
        'Expected a value of type `credit card cvv`, but received: `"000000"`',
      );
    });
  });

  describe('isEmail', () => {
    it.each(['user@gmail.com', 'user@yahoo.es', 'user@hotmail.com'])(
      'should return an Object with email property when email is %s',
      (email: string) => {
        const result = isValidEmail.validate(email);

        expect(result).toEqual([undefined, email]);
      },
    );

    it.each(['user@outlook.com', 'user@fake.com', 'invalidEmail'])(
      'should return a StructError with error message when email is %s',
      (email: string) => {
        const result = isValidEmail.validate(email);

        expect(result).toEqual([expect.any(StructError), undefined]);
        expect(result[0]).toBeInstanceOf(StructError);
        expect(result[0]).toHaveProperty(
          'message',
          expect.stringContaining(email),
        );
      },
    );
  });

  describe('isValidCard', () => {
    it('should return an Object with card property when card is valid', () => {
      const card = '4772006244423245';

      const result = isValidCard.validate(card);

      expect(result).toEqual([undefined, card]);
    });
    it('should return a StructError with error message when card is not valid', () => {
      const card = '00000004772006244423245';

      const result = isValidCard.validate(card);

      expect(result).toEqual([expect.any(StructError), undefined]);
      expect(result[0]).toBeInstanceOf(StructError);
      expect(result[0]).toHaveProperty(
        'message',
        'Expected a value of type `credit card number`, but received: `"00000004772006244423245"`',
      );
    });
  });

  describe('isValidYear', () => {
    it('should return an Object with year property when year is valid', () => {
      const year = new Date().getFullYear() + 3;

      const result = isValidYear.validate(year);

      expect(result).toEqual([undefined, year]);
    });
    it('should return a StructError with error message when year is not valid', () => {
      const year = new Date().getFullYear() + 10;

      const result = isValidYear.validate(year);

      expect(result).toEqual([expect.any(StructError), undefined]);
      expect(result[0]).toBeInstanceOf(StructError);
      expect(result[0]).toHaveProperty(
        'message',
        'Expected a value of type `credit card expiration year`, but received: `' +
          year +
          '`',
      );
    });
  });

  describe('isValidMonth', () => {
    it('should return an Object with month property when month is valid', () => {
      const month = 10;

      const result = isValidMonth.validate(month);

      expect(result).toEqual([undefined, month]);
    });
    it('should return a StructError with error message when month is not valid', () => {
      const month = 15;

      const result = isValidMonth.validate(month);

      expect(result).toEqual([expect.any(StructError), undefined]);
      expect(result[0]).toBeInstanceOf(StructError);
      expect(result[0]).toHaveProperty(
        'message',
        'Expected a value of type `credit card expiration month`, but received: `' +
          month +
          '`',
      );
    });
  });
});
