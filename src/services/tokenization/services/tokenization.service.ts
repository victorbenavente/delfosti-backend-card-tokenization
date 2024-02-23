import { PromiseResult } from 'aws-sdk/lib/request';
import { CreateTokenRequest } from '../dtos/create-token-request.dto';
import { generateToken } from '../utils/tokenization.utils';
import * as AWS from 'aws-sdk';

export class TokenizationService {
  public static async tokenize(data: CreateTokenRequest) {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result: PromiseResult<
      AWS.DynamoDB.DocumentClient.PutItemOutput,
      AWS.AWSError
    > = await dynamodb
      .put({
        TableName: 'CardInfo',
        Item: {
          ...data,
          token: generateToken(),
        },
      })
      .promise();

    return result.$response.data;
  }
}
