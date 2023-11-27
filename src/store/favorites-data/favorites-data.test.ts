import { favoritesData } from './favorites-data';
import { fetchFavoritesAction, addFavoritesAction } from '../api-actions';
import { FavoritesData } from '../../types/state';
import { makeFakeOffer } from '../../utils/mocks';

describe('Offers data slice', () => {
  it('should return initial state after empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: FavoritesData = {
      favoriteOffers: [],
      isLoading: false,
      hasError: false,
    };
    const result = favoritesData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state', () => {
    const emptyAction = { type: '' };
    const expectedState: FavoritesData = {
      favoriteOffers: [],
      isLoading: false,
      hasError: false,
    };
    const result = favoritesData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading flag to true, hasError to false after fetchFavoritesAction pending', () => {
    const initialState: FavoritesData = {
      favoriteOffers: [],
      isLoading: false,
      hasError: false,
    };
    const expectedState: FavoritesData = {
      favoriteOffers: [],
      isLoading: true,
      hasError: false,
    };
    const result = favoritesData.reducer(initialState, fetchFavoritesAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading flag to false, hasError to true after fetchFavoritesAction rejected', () => {
    const initialState: FavoritesData = {
      favoriteOffers: [],
      isLoading: false,
      hasError: false,
    };
    const expectedState: FavoritesData = {
      favoriteOffers: [],
      isLoading: false,
      hasError: true,
    };
    const result = favoritesData.reducer(initialState, fetchFavoritesAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading flag to false, hasError to false, favoriteOffers are updated after fetchFavoritesAction fulfilled', () => {
    const mockOfferFirst = makeFakeOffer();
    const mockOfferSecond = makeFakeOffer();
    const initialState: FavoritesData = {
      favoriteOffers: [],
      isLoading: false,
      hasError: false,
    };
    const expectedState: FavoritesData = {
      favoriteOffers: [mockOfferFirst, mockOfferSecond],
      isLoading: false,
      hasError: false,
    };
    const result = favoritesData.reducer(initialState, fetchFavoritesAction.fulfilled([mockOfferFirst, mockOfferSecond], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set favoriteOffers are updated after addFavoritesAction fulfilled', () => {
    const mockOfferFirst = makeFakeOffer();
    const mockOfferSecond = makeFakeOffer();
    const initialState: FavoritesData = {
      favoriteOffers: [mockOfferFirst],
      isLoading: false,
      hasError: false,
    };
    const expectedState: FavoritesData = {
      favoriteOffers: [mockOfferFirst, mockOfferSecond],
      isLoading: false,
      hasError: false,
    };
    const result = favoritesData.reducer(initialState, addFavoritesAction.fulfilled(mockOfferSecond, '', mockOfferSecond));

    expect(result).toEqual(expectedState);
  });
});
