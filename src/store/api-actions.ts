import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State, UserInfo } from '../types/state';
import { Offer, AuthData } from '../types';
import { ApiUrl } from '../api/urls';
import { saveToken, dropToken } from '../services/token';
import { redirectToRoute } from './actions';
import { AppRoute } from '../const';
import { updateUserInfo } from './user-data/user-data';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(ApiUrl.GET_OFFERS);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/fetchFavorites',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(ApiUrl.FAVORITES);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<UserInfo | null>(ApiUrl.LOGIN);
    if (data) {
      dispatch(updateUserInfo(data));
      dispatch(fetchFavoritesAction());
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserInfo>(ApiUrl.LOGIN, {email, password});
    if (data) {
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Favorites));
      dispatch(updateUserInfo(data));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiUrl.LOGOUT);
    dropToken();
    dispatch(updateUserInfo(null));
  },
);

export const addFavoritesAction = createAsyncThunk<Offer, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/addFavorites',
  async (favoriteOffer, {extra: api}) => {
    const { id } = favoriteOffer;
    const { data } = await api.post<Offer>(`${ApiUrl.FAVORITES}/${id}/1`);
    return data;
  },
);

export const removeFavoritesAction = createAsyncThunk<Offer, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/removeFavorites',
  async (favoriteOffer, {extra: api}) => {
    const { id } = favoriteOffer;
    const { data } = await api.post<Offer>(`${ApiUrl.FAVORITES}/${id}/0`);
    return data;
  },
);