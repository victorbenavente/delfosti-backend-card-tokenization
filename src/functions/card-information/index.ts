import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { merchantAuthMiddleware } from '../../common/middlewares/auth-merchant.middleware';
import middy from '@middy/core';
import { httpErrorHandler } from '../../common/errors/error-handler';
import { CardInformationService } from './services/card-information.service';
import { CardInfoResponse } from './dtos/card-info.response.dto';
import { GetCardInfoRequest } from './dtos/get-card-info.request.dto';

export const getCardInformation = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { token } = event.pathParameters as any;
  const getCardInfoRequest = new GetCardInfoRequest(token);
  getCardInfoRequest.isValid();
  const result: Awaited<CardInfoResponse> =
    await CardInformationService.getCard(getCardInfoRequest.token);
  return {
    body: JSON.stringify(result),
    statusCode: 200,
  };
};

export const handler: APIGatewayProxyHandler = middy()
  .before(merchantAuthMiddleware)
  .onError(httpErrorHandler)
  .handler(getCardInformation);
