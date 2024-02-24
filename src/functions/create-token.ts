import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { CreateTokenRequest } from '../services/tokenization/dtos/create-token-request.dto';
import { validateRequest } from '../services/tokenization/utils/validators';
import middy from '@middy/core';
import { httpErrorHandler } from '../common/errors/error-handler';
import { merchantAuthMiddleware } from '../common/middlewares/merchant-auth.middleware';

export const createToken = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const request: CreateTokenRequest = JSON.parse(event.body as any);
  validateRequest(request);

  return {
    body: `Hello ${request.card_number} ${request.email}`,
    headers: {
      'content-type': 'text',
    },
    statusCode: 200,
  };
};

export const handler: APIGatewayProxyHandler = middy()
  .before(merchantAuthMiddleware)
  .onError(httpErrorHandler)
  .handler(createToken);
