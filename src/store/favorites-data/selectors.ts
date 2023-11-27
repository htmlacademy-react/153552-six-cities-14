import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types';

export const getFavorites = (state: Pick<State, NameSpace.Favorites>): Offer[] => state[NameSpace.Favorites].favoriteOffers;
export const getFavoritesDataLoadingStatus = (state: Pick<State, NameSpace.Favorites>): boolean => state[NameSpace.Favorites].isLoading;
export const getFavoritesErrorStatus = (state: Pick<State, NameSpace.Favorites>): boolean => state[NameSpace.Favorites].hasError;
