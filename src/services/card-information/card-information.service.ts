import { NotFoundException } from '../../common/errors/not-found.exception';
import { keyv } from '../../common/redis-store/redis-store';
import { CardInfoResponse } from './dtos/card-info.response.dto';

export class CardInformationService {
  public static async getCard(token: string): Promise<CardInfoResponse> {
    try {
      const card = await keyv.get(token);
      if (!card) {
        throw new NotFoundException(
          'Card information expired or not founded, please generate a new token',
        );
      }
      return JSON.parse(card);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error('Fail to get card from datasource');
    }
  }
}
