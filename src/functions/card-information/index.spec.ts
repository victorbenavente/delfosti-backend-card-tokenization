import { getCardInformation } from '.';
import { cardInfoResponseMock } from '../../common/__mocks__/card.mock';
import { eventRequestMock } from '../../common/__mocks__/event-request.mock';
import { CardInformationService } from './services/card-information.service';
jest.mock('./services/card-information.service', () => {
  return {
    CardInformationService: {
      getCard: jest.fn().mockImplementation(() => cardInfoResponseMock),
    },
  };
});

describe('getCardInformation', () => {
  it('should return status 200 with valid card info Object', async () => {
    const result = await getCardInformation(eventRequestMock);

    expect(CardInformationService.getCard).toHaveBeenCalled();
    expect(result).toMatchObject({
      statusCode: 200,
      body: JSON.stringify(cardInfoResponseMock),
    });
  });
});
