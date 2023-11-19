import { NameSpace } from '../../const';
import { getOffers, getOffersDataLoadingStatus, getErrorStatus } from './selectors';
import { makeFakeOffer } from '../../utils/mocks';

describe('Offers data selectors', () => {
  const mockOffer = makeFakeOffer();
  const state = {
    [NameSpace.Offers]: {
      offers: [mockOffer],
      isLoading: true,
      hasError: false,
    }
  };

  it('should return offers from store', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffers(state);

    expect(result).toEqual(offers);
  });

  it('should return loading status from store', () => {
    const { isLoading } = state[NameSpace.Offers];
    const result = getOffersDataLoadingStatus(state);

    expect(result).toBe(isLoading);
  });

  it('should return error status from store', () => {
    const { hasError } = state[NameSpace.Offers];
    const result = getErrorStatus(state);

    expect(result).toBe(hasError);
  });
});
