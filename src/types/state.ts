import { store } from '../store';
import { Offer } from '.';
import { Cities } from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type OffersData = {
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
}

export type CityData = {
  city: keyof typeof Cities;
}
