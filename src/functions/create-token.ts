import 'reflect-metadata';
import { APIGatewayProxyResult } from 'aws-lambda';
import { CreateTokenRequest } from '../services/tokenization/dtos/create-token-request.dto';
import { composeHandler } from '@lambda-middleware/compose';
import { classValidator } from '@lambda-middleware/class-validator';
import { errorHandler } from "@lambda-middleware/http-error-handler";

export const createToken = async (event: {
  body: CreateTokenRequest;
}): Promise<APIGatewayProxyResult> => {
  return {
    body: `Hello ${event.body.card_number} ${event.body.email}`,
    headers: {
      'content-type': 'text',
    },
    statusCode: 200,
  };
};

export const handler = composeHandler(
  errorHandler(),
  classValidator({
    bodyType: CreateTokenRequest,
    transformer: {},
    validator: {},
  }),
  createToken,
);
