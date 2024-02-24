import { Request, MiddyfiedHandler } from '@middy/core';
import { Context } from 'aws-lambda';
import createHttpError from 'http-errors';
import { StructError } from 'superstruct';
import { NotFoundException } from './not-found.exception';

export async function httpErrorHandler(
  request: Request<unknown, any, Error, Context>,
): Promise<MiddyfiedHandler> {
  let httpException: createHttpError.HttpError;
  if (request.error instanceof StructError) {
    httpException = new createHttpError[400]();
    request.response = {
      statusCode: httpException.statusCode,
      body: JSON.stringify({
        status: httpException.statusCode.toString(),
        message: httpException.message,
        description: request.error?.message,
      }),
    };
  } else if (request.error instanceof NotFoundException) {
    httpException = new createHttpError[404]();
    request.response = {
      statusCode: httpException.statusCode,
      body: JSON.stringify({
        status: httpException.statusCode.toString(),
        message: httpException.message,
        description: request.error?.message,
      }),
    };
  } else {
    httpException = new createHttpError[500]();
    request.response = {
      statusCode: httpException.statusCode,
      body: JSON.stringify({
        status: httpException.statusCode.toString(),
        message: httpException.message,
        description: request.error?.message,
      }),
    };
  }
  return request.response;
}
