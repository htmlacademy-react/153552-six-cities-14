import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthStatus } from '../../const';
import { AutorizationData } from '../../types/state';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

export const initialState: AutorizationData = {
  authorizationStatus: AuthStatus.Unknown,
};

export const autorizationData = createSlice({
  name: NameSpace.AuthorizationStatus,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      });
  }
});
