import { name, internet, lorem, datatype, random, image, date } from 'faker';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Offer, City, Location, User, AuthData, Comment } from '../types';
import { UserInfo, State } from '../types/state';
import { AuthStatus, cities } from '../const';
import { createApi } from '../api/api';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeUserInfo = (): UserInfo => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number({ min: 1, max: 100 }),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.uuid(),
} as UserInfo);

export const makeFakeLocation = (): Location => ({
  latitude: datatype.number({ min: -90, max: 90, precision: 0.000001 }),
  longitude: datatype.number({ min: -180, max: 180, precision: 0.000001 }),
  zoom: datatype.number({ min: 1, max: 17 }),
} as Location);

export const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: random.arrayElement(cities)
} as City);

export const makeFakeHost = (): User => ({
  avatarUrl: internet.avatar(),
  id: datatype.number({ min: 1, max: 100 }),
  isPro: datatype.boolean(),
  name: name.firstName(),
} as User);

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number({ min: 1, max: 10 }),
  city: makeFakeCity(),
  description: lorem.lines(1),
  goods: datatype.array(5),
  host: makeFakeHost(),
  id: datatype.number({ min: 1, max: 100 }),
  images: [
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
    image.imageUrl(400, 400),
  ],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: datatype.number({ min: 1, max: 10 }),
  previewImage: image.imageUrl(500, 500),
  price: datatype.number({ min: 1, max: 999 }),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  title: lorem.lines(1),
  type: lorem.word(),
} as Offer);

export const makeFakeAuthData = (): AuthData => ({
  login: lorem.word(),
  password: internet.password(),
} as AuthData);

export const makeFakeComment = (): Comment => ({
  comment: lorem.paragraph(),
  date: new Date(date.recent()).toLocaleString(),
  id: datatype.number({ min: 1, max: 100 }),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  user: makeFakeHost(),
} as Comment);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  AUTORIZATION_STATUS: { authorizationStatus: AuthStatus.Unknown },
  USER: { user: makeFakeUserInfo() },
  CITY: { city: cities[0] },
  OFFERS: {
    offers: [makeFakeOffer(), makeFakeOffer()],
    isLoading: false,
    hasError: false,
  },
  FAVORITES: {
    favoriteOffers: [makeFakeOffer(), makeFakeOffer()],
    isLoading: false,
    hasError: false,
  },
  ...initialState ?? {},
});
