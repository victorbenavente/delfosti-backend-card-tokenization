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

import { cardInfoMock } from '../../../common/__mocks__/card.mock';
import { CreateTokenRequest } from '../dtos/create-token-request.dto';
import { TokenizationService } from './tokenization.service';
import { TokenResponse } from '../dtos/token.response.dto';

describe('TokenizationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save card info on Redis and return a valid token', async () => {
    jest.spyOn(mockKeyvInstance, 'set').mockResolvedValue(undefined);
    const createTokenRequestMock = new CreateTokenRequest(cardInfoMock);

    const result = await TokenizationService.tokenize(createTokenRequestMock);

    expect(mockKeyvInstance.set).toHaveBeenCalledWith(
      expect.stringMatching(/^[a-zA-Z0-9]+$/),
      JSON.stringify(createTokenRequestMock),
      900000,
    );
    expect(result).toBeInstanceOf(TokenResponse);
    expect(result).toMatchObject({ token: /^[a-zA-Z0-9]+$/ });
  });

  it('should return an Error when Redis connection fails', async () => {
    const createTokenRequestMock = new CreateTokenRequest(cardInfoMock);
    jest
      .spyOn(mockKeyvInstance, 'set')
      .mockRejectedValue(new Error('unknown error'));

    const result = async () =>
      await TokenizationService.tokenize(createTokenRequestMock);

    expect(result).rejects.toThrow('Fail to set token in Redis');
  });
});
