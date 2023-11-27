import { NameSpace } from '../../const';
import { getFavorites, getFavoritesDataLoadingStatus, getFavoritesErrorStatus } from './selectors';
import { makeFakeOffer } from '../../utils/mocks';

describe('Offers data selectors', () => {
  const mockOffer = makeFakeOffer();
  const state = {
    [NameSpace.Favorites]: {
      favoriteOffers: [mockOffer],
      isLoading: true,
      hasError: false,
    }
  };

  it('should return favorite offers from store', () => {
    const { favoriteOffers } = state[NameSpace.Favorites];
    const result = getFavorites(state);

    expect(result).toEqual(favoriteOffers);
  });

  it('should return loading status from store', () => {
    const { isLoading } = state[NameSpace.Favorites];
    const result = getFavoritesDataLoadingStatus(state);

    expect(result).toBe(isLoading);
  });

  it('should return error status from store', () => {
    const { hasError } = state[NameSpace.Favorites];
    const result = getFavoritesErrorStatus(state);

    expect(result).toBe(hasError);
  });
});
