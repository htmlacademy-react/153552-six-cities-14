import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersData } from './offers-data/offers-data';
import { cityData } from './city-data/city-data';
import { autorizationData } from './autorization-status-data/autorization-status';
import { userInfoData } from './user-data/user-data';
import { favoritesData } from './favorites-data/favorites-data';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.City]: cityData.reducer,
  [NameSpace.AuthorizationStatus]: autorizationData.reducer,
  [NameSpace.User]: userInfoData.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
});
