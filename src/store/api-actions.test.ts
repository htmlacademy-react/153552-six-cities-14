import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createApi } from '../api/api';
import { ApiUrl } from '../api/urls';
import { cities } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types';
import { redirectToRoute } from './actions';
import * as tokenStorage from '../token/token';
import { updateUserInfo } from './user-data/user-data';
import { checkAuthAction, fetchOffersAction, fetchFavoritesAction, addFavoritesAction, removeFavoritesAction, loginAction, logoutAction } from './api-actions';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffer } from '../utils/mocks';

describe('Async actions', () => {
  const axios = createApi();
  const mockAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFERS: { offers: [] }, FAVORITES: { favoriteOffers: [] }, USER: { user: null }, CITY: { city: cities[0]}});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAdapter.onGet(ApiUrl.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAdapter.onGet(ApiUrl.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async() => {
      const mockOffer = [makeFakeOffer()];
      mockAdapter.onGet(ApiUrl.GetOffers).reply(200, mockOffer);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAdapter.onGet(ApiUrl.GetOffers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfilled", when server response 200', async() => {
      const mockOffer = makeFakeOffer();
      mockAdapter.onGet(ApiUrl.Favorites).reply(200, mockOffer);

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);

      expect(fetchActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when server response 400', async () => {
      mockAdapter.onGet(ApiUrl.Favorites).reply(400, []);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('addFavoritesAction', () => {
    it('should dispatch "addFavoritesAction.pending", "addFavoritesAction.fulfilled", when server response 200', async() => {
      const mockOffer = makeFakeOffer();
      mockAdapter.onPost(`${ApiUrl.Favorites}/${mockOffer.id}/1`).reply(200, mockOffer);

      await store.dispatch(addFavoritesAction(mockOffer));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchActionFulfilled = emittedActions.at(1) as ReturnType<typeof addFavoritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        addFavoritesAction.pending.type,
        addFavoritesAction.fulfilled.type,
      ]);

      expect(fetchActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "addFavoritesAction.pending", "addFavoritesAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAdapter.onGet(`${ApiUrl.Favorites}/${mockOffer.id}/1`).reply(400, []);

      await store.dispatch(addFavoritesAction(mockOffer));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addFavoritesAction.pending.type,
        addFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('removeFavoritesAction', () => {
    it('should dispatch "removeFavoritesAction.pending", "removeFavoritesAction.fulfilled", when server response 200', async() => {
      const mockOffer = makeFakeOffer();
      mockAdapter.onPost(`${ApiUrl.Favorites}/${mockOffer.id}/0`).reply(200, mockOffer);

      await store.dispatch(removeFavoritesAction(mockOffer));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchActionFulfilled = emittedActions.at(1) as ReturnType<typeof removeFavoritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        removeFavoritesAction.pending.type,
        removeFavoritesAction.fulfilled.type,
      ]);

      expect(fetchActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "removeFavoritesAction.pending", "removeFavoritesAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAdapter.onGet(`${ApiUrl.Favorites}/${mockOffer.id}/0`).reply(400, []);

      await store.dispatch(removeFavoritesAction(mockOffer));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        removeFavoritesAction.pending.type,
        removeFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAdapter.onPost(ApiUrl.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        updateUserInfo.type,
        fetchFavoritesAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAdapter.onPost(ApiUrl.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAdapter.onDelete(ApiUrl.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAdapter.onDelete(ApiUrl.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
