import { keyv } from '../../common/redis-store/redis-store';
import { CreateTokenRequest } from './dtos/create-token-request.dto';
import { TokenResponse } from './dtos/token.response.dto';
import { generateToken } from './utils/tokenization.utils';

const TTL_IN_MILIS = 900000;

export class TokenizationService {
  public static async tokenize(
    data: CreateTokenRequest,
  ): Promise<TokenResponse> {
    try {
      const token = generateToken();
      await keyv.set(token, JSON.stringify(data), TTL_IN_MILIS);
      return { token };
    } catch (error) {
      throw new Error('Fail to store new token');
    }
  }
}
