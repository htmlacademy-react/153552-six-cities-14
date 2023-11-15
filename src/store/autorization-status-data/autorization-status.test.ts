import { autorizationData } from './autorization-status';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AutorizationData } from '../../types/state';
import { AuthStatus } from '../../const';
import { makeFakeAuthData } from '../../utils/mocks';
import { AuthData } from '../../types';

describe('Offers data slice', () => {
  it('should return initial state after empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: AutorizationData = {
      authorizationStatus: AuthStatus.Unknown,
    };
    const result = autorizationData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state', () => {
    const emptyAction = { type: '' };
    const expectedState: AutorizationData = {
      authorizationStatus: AuthStatus.Unknown,
    };
    const result = autorizationData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set authorization status AUTH with checkAuthAction fulfilled', () => {
    const initialState: AutorizationData = {
      authorizationStatus: AuthStatus.Unknown,
    };
    const expectedState: AutorizationData = {
      authorizationStatus: AuthStatus.Auth,
    };
    const result = autorizationData.reducer(initialState, checkAuthAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set authorization status NO_AUTH with checkAuthAction rejected', () => {
    const initialState: AutorizationData = {
      authorizationStatus: AuthStatus.Unknown,
    };
    const expectedState: AutorizationData = {
      authorizationStatus: AuthStatus.NoAuth,
    };
    const result = autorizationData.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set authorization status AUTH with loginAction fulfilled', () => {
    const mockAuthData: AuthData = makeFakeAuthData();
    const initialState: AutorizationData = {
      authorizationStatus: AuthStatus.Unknown,
    };
    const expectedState: AutorizationData = {
      authorizationStatus: AuthStatus.Auth,
    };
    const result = autorizationData.reducer(initialState, loginAction.fulfilled(undefined, '', mockAuthData));

    expect(result).toEqual(expectedState);
  });

  it('should set authorization status NO_AUTH with loginAction rejected', () => {
    const initialState: AutorizationData = {
      authorizationStatus: AuthStatus.Unknown,
    };
    const expectedState: AutorizationData = {
      authorizationStatus: AuthStatus.NoAuth,
    };
    const result = autorizationData.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set authorization status AUTH with logoutAction fulfilled', () => {
    const initialState: AutorizationData = {
      authorizationStatus: AuthStatus.Unknown,
    };
    const expectedState: AutorizationData = {
      authorizationStatus: AuthStatus.NoAuth,
    };
    const result = autorizationData.reducer(initialState, logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
