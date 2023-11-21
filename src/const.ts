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

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export type CityName = typeof cities[number];

export const enum MarkerUrl {
  Default = 'src/static/pin.svg',
  Active = 'src/static/pin-active.svg',
}

export enum NameSpace {
  Offers = 'OFFERS',
  City = 'CITY',
  AuthorizationStatus = 'AUTORIZATION_STATUS',
  User = 'USER',
  Favorites = 'FAVORITES',
}

export enum SortingOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const ERROR_STATUS_CODE = 404;
export const ERROR_ROUTE = '404';
