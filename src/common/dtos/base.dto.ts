import createError from 'http-errors';
import { validate, ValidationError } from 'class-validator';

export class BaseDto {
  async isValid(): Promise<void> {
    const errors = await validate(this);
    console.log('errors', errors)
    const badRequest = new createError.BadRequest();

    if (errors.length > 0) {
      throw createError(badRequest.statusCode, badRequest.name, {
        errors: errors.map((e: ValidationError) => ({
          property: e.property,
          constraints: this.getConstraints(e),
        })),
      });
    }
  }

  private getConstraints(error: ValidationError): string[] {
    if (error?.children?.length) {
      return this.getConstraints(error.children[0]);
    }

    return Object.values(error.constraints ?? {});
  }
}
