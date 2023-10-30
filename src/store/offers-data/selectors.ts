import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types';

export const getOffers = (state: Pick<State, NameSpace.Offers>): Offer[] => state[NameSpace.Offers].offers;
export const getOffersDataLoadingStatus = (state: Pick<State, NameSpace.Offers>): boolean => state[NameSpace.Offers].isLoading;
export const getErrorStatus = (state: Pick<State, NameSpace.Offers>): boolean => state[NameSpace.Offers].hasError;
