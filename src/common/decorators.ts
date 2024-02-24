import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import {
  validateCardLength,
  validateCardWithLuhn,
} from '../services/tokenization/utils/tokenization.utils';

export function IsValidCard(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidCard',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            validateCardLength(value) &&
            validateCardWithLuhn(value)
          );
        },
      },
    });
  };
}

export function IsValidYear(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidCard',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          const currentYear = new Date().getFullYear();
          const isValidYear = value < currentYear || value > currentYear + 5;
          return typeof value === 'string' && isValidYear;
        },
      },
    });
  };
}
