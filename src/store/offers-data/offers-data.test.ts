import { offersData } from './offers-data';
import { fetchOffersAction } from '../api-actions';
import { OffersData } from '../../types/state';
import { makeFakeOffer } from '../../utils/mocks';

describe('Offers data slice', () => {
  it('should return initial state after empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: OffersData = {
      offers: [],
      isLoading: false,
      hasError: false,
    };
    const result = offersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state', () => {
    const emptyAction = { type: '' };
    const expectedState: OffersData = {
      offers: [],
      isLoading: false,
      hasError: false,
    };
    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading flag to true, hasError to false after fetchOffersAction pending', () => {
    const initialState: OffersData = {
      offers: [],
      isLoading: false,
      hasError: false,
    };
    const expectedState: OffersData = {
      offers: [],
      isLoading: true,
      hasError: false,
    };
    const result = offersData.reducer(initialState, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading flag to false, hasError to true after fetchOffersAction rejected', () => {
    const initialState: OffersData = {
      offers: [],
      isLoading: false,
      hasError: false,
    };
    const expectedState: OffersData = {
      offers: [],
      isLoading: false,
      hasError: true,
    };
    const result = offersData.reducer(initialState, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading flag to false, hasError to false, offers are ready after fetchOffersAction fulfilled', () => {
    const mockOfferFirst = makeFakeOffer();
    const mockOfferSecond = makeFakeOffer();
    const initialState: OffersData = {
      offers: [],
      isLoading: false,
      hasError: false,
    };
    const expectedState: OffersData = {
      offers: [mockOfferFirst, mockOfferSecond],
      isLoading: false,
      hasError: false,
    };
    const result = offersData.reducer(initialState, fetchOffersAction.fulfilled([mockOfferFirst, mockOfferSecond], '', undefined));

    expect(result).toEqual(expectedState);
  });
});
