import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import {
  CreateTokenRequest,
  ICreateTokenRequest,
} from './dtos/create-token-request.dto';
import middy from '@middy/core';
import { httpErrorHandler } from '../../common/errors/error-handler';
import { merchantAuthMiddleware } from '../../common/middlewares/auth-merchant.middleware';
import { TokenizationService } from './services/tokenization.service';
import { TokenResponse } from './dtos/token.response.dto';

export const createToken = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  console.log(event.body);
  const data: ICreateTokenRequest = JSON.parse(event.body as any);
  const request = new CreateTokenRequest(data);
  request.isValid();
  const result: Awaited<TokenResponse> =
    await TokenizationService.tokenize(request);
  return {
    body: JSON.stringify(result),
    statusCode: 200,
  };
};

export const handler: APIGatewayProxyHandler = middy()
  .before(merchantAuthMiddleware)
  .onError(httpErrorHandler)
  .handler(createToken);
