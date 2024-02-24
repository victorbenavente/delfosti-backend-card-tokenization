import { MiddyfiedHandler, Request } from '@middy/core';
import { Context } from 'aws-lambda';
import createHttpError from 'http-errors';

export async function merchantAuthMiddleware(
  request: Request<unknown, any, Error, Context>,
): Promise<MiddyfiedHandler> {
  const token = (request.event as any).headers?.authorization;
  const validTokenPattern = /^pk_test_[a-zA-Z0-9]{16}$/;
  const pattern = new RegExp(validTokenPattern);
  if (!pattern.test(token)) {
    const httpException = new createHttpError[401]();
    request.response = {
      statusCode: httpException.statusCode,
      body: JSON.stringify({
        status: httpException.statusCode.toString(),
        message: httpException.message,
      }),
    };
  }
  return request.response;
}
