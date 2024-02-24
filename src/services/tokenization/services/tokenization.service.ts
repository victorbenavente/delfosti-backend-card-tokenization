import { keyv } from '../../../common/redis-store/redis-store';
import { CreateTokenRequest } from '../dtos/create-token-request.dto';
import { generateToken } from '../utils/tokenization.utils';

const TTL_IN_MILIS = 900000;

export class TokenizationService {
  public static async tokenize(data: CreateTokenRequest) {
    const token = generateToken();
    keyv.set(token, JSON.stringify(data), TTL_IN_MILIS);
    return {
      token: generateToken(),
    };
  }
}
