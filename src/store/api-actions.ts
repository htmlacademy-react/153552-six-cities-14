import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State, UserInfo } from '../types/state';
import { Offer, AuthData } from '../types';
import { apiUrls } from '../api/urls';
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
    const { data } = await api.get<Offer[]>(apiUrls.GET_OFFERS);
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
    const { data } = await api.get<UserInfo | null>(apiUrls.LOGIN);
    if (data) {
      dispatch(updateUserInfo(data));
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
    const {data} = await api.post<UserInfo>(apiUrls.LOGIN, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Favorites));
    if (data) {
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
    await api.delete(apiUrls.LOGOUT);
    dropToken();
    dispatch(updateUserInfo(null));
  },
);
