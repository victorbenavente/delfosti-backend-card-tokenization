import { createToken } from '.';
import { cardInfoMock } from '../../common/__mocks__/card.mock';
import { eventRequestMock } from '../../common/__mocks__/event-request.mock';
import { tokenMock } from '../../common/__mocks__/token.mock';
import { TokenizationService } from './services/tokenization.service';
jest.mock('./services/tokenization.service', () => {
  return {
    TokenizationService: {
      tokenize: jest.fn().mockImplementation(() => tokenMock),
    },
  };
});

describe('createToken', () => {
  it('should return status 200 with valid token Object', async () => {
    const customEvent = {
      ...eventRequestMock,
      body: JSON.stringify(cardInfoMock),
    };

    const result = await createToken(customEvent);

    expect(TokenizationService.tokenize).toHaveBeenCalled();
    expect(result).toMatchObject({
      statusCode: 200,
      body: JSON.stringify(tokenMock),
    });
  });
});
