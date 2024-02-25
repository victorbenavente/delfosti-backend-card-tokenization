const mockKeyvInstance = {
  set: jest.fn(),
  get: jest.fn(),
  delete: jest.fn(),
  on: jest.fn(),
};
jest.mock('keyv', () => jest.fn().mockImplementation(() => mockKeyvInstance));
jest.mock('@keyv/redis', () =>
  jest.fn().mockImplementation(() => mockKeyvInstance),
);

import { CardInfoResponse } from '../dtos/card-info.response.dto';
import { CardInformationService } from './card-information.service';

describe('CardInformationService', () => {
  const cardMock = {
    cvv: 'fake_cvv',
    card_number: 'fake_card_number',
    email: 'fake_email',
    expiration_month: 'fake_month',
    expiration_year: 'fake_year',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return card info without property "cvv" if token exist in Redis', async () => {
    const token = 'Y30f0NDnNySC0Oy7';
    jest
      .spyOn(mockKeyvInstance, 'get')
      .mockResolvedValue(JSON.stringify(cardMock));

    const result = await CardInformationService.getCard(token);

    expect(result).toBeInstanceOf(CardInfoResponse);
    expect(result).not.toHaveProperty('cvv');
    expect(result).toMatchObject({
      card_number: cardMock.card_number,
      email: cardMock.email,
      expiration_month: cardMock.expiration_month,
      expiration_year: cardMock.expiration_year,
    });
  });

  it('should return a not found Error when Redis return undefined', async () => {
    const token = 'Y30f0NDnNySC0Oy7';
    jest.spyOn(mockKeyvInstance, 'get').mockResolvedValue(undefined);

    const result = async () => await CardInformationService.getCard(token);

    expect(result).rejects.toThrow(
      'Card information expired or not founded, please generate a new token',
    );
  });

  it('should return an Error when Redis store fails', async () => {
    const token = 'Y30f0NDnNySC0Oy7';
    jest
      .spyOn(mockKeyvInstance, 'get')
      .mockRejectedValue(new Error('unknown error'));

    const result = async () => await CardInformationService.getCard(token);

    expect(result).rejects.toThrow('Fail to get card from datasource');
  });
});
