import { validateCardWithLuhn, generateToken } from './tokenization.utils';

describe('tokenization-utils', () => {
  describe('validateCardWithLuhn', () => {
    it.each([
      '8840527995653340',
      '9648981133655938',
      '8471509787596332',
      '5456493209990878',
      '000F449329990878',
    ])(
      'should return false when card %s has invalid format',
      (card: string) => {
        const result = validateCardWithLuhn(card);

        expect(result).toBeFalsy();
      },
    );

    it.each([
      '4110935686034741',
      '4547791220079590',
      '5591319736063551',
      '5591315405009958',
      '377897116360672',
      '377897324772676',
    ])('should return true when card %s has valid format', (card: string) => {
      const result = validateCardWithLuhn(card);

      expect(result).toBeTruthy();
    });
  });

  describe('generateToken', () => {
    it('should return a valid 16-character alphanumeric token', () => {
      const result = generateToken();

      expect(result).toMatch(/^[a-zA-Z0-9]+$/)
      expect(result.length).toBe(16);
    });
  });
});
