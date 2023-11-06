export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export type CityName = typeof Cities[number];

export const enum MarkersUrls {
  Default = 'src/static/pin.svg',
  Active = 'src/static/pin-active.svg',
}

export enum NameSpace {
  Offers = 'OFFERS',
  City = 'CITY',
  AuthorizationStatus = 'AUTORIZATION_STATUS',
  User = 'USER',
}

export enum SortingOptions {
  POPULAR = 'Popular',
  PRICE_LOW_TO_HIGH = 'Price: low to high',
  PRICE_HIGH_TO_LOW = 'Price: high to low',
  TOP_RATED_FIRST = 'Top rated first',
}

export const ERROR_STATUS_CODE = 404;
export const ERROR_ROUTE = '404';
