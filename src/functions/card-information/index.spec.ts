import { getCardInformation } from '.';
import { cardInfoResponseMock } from '../../common/__mocks__/card.mock';
import { eventRequestMock } from '../../common/__mocks__/event-request.mock';
import { tokenMock } from '../../common/__mocks__/token.mock';
import { CardInformationService } from './services/card-information.service';
jest.mock('./services/card-information.service', () => {
  return {
    CardInformationService: {
      getCard: jest.fn().mockImplementation(() => cardInfoResponseMock),
    },
  };
});

describe('getCardInformation', () => {
  it('should return status 200 with token Object', async () => {
    const customEvent = {
      ...eventRequestMock,
      pathParameters: tokenMock,
    };

    const result = await getCardInformation(customEvent);

    expect(CardInformationService.getCard).toHaveBeenCalled();
    expect(result).toMatchObject({
      statusCode: 200,
      body: JSON.stringify(cardInfoResponseMock),
    });
  });
});
