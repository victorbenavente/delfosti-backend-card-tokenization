import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { merchantAuthMiddleware } from '../common/middlewares/auth-merchant.middleware';
import middy from '@middy/core';
import { httpErrorHandler } from '../common/errors/error-handler';
import { CardInformationService } from '../services/card-information/card-information.service';
import { CardInfoResponse } from '../services/card-information/dtos/card-info.response.dto';

export const getCardInformation = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { token } = event.pathParameters as any;
  const result: Awaited<CardInfoResponse> =
    await CardInformationService.getCard(token);
  return {
    body: JSON.stringify(result),
    statusCode: 200,
  };
};

export const handler: APIGatewayProxyHandler = middy()
  .before(merchantAuthMiddleware)
  .onError(httpErrorHandler)
  .handler(getCardInformation);
