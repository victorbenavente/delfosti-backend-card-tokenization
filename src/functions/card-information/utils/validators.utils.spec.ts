import { StructError, assert, object } from 'superstruct';
import { isValidToken } from './validators.utils';

describe('validators-utils', () => {
  describe('isValidToken', () => {
    it('should return an array with undefined and when token is valid', () => {
      const token = 'NUBQKmpd8rRJpLru';
      const result = isValidToken.validate(token);

      expect(result).toEqual([undefined, token]);
    });
    it('should return a StructError with error message when token is not valid', () => {
      const token = 'fakeToken';
      const result = isValidToken.validate(token);

      expect(result).toEqual([expect.any(StructError), undefined]);
      expect(result[0]).toBeInstanceOf(StructError);
      expect(result[0]).toHaveProperty(
        'message',
        'Expected a value of type `culqi token of 16 char.`, but received: `"fakeToken"`',
      );
    });
  });
});
