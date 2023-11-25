import { cities, CityName } from '../const';
import { Offer } from '../types';

export const getRating = (rating: number) => `${Math.round(rating) * 20}%`;

export const getMonthYearDate = (date: string) => new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });

export const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const getRandomCity = (): CityName => cities[Math.floor(Math.random() * cities.length)];

export const replaceFavoriteOffer = (offers: Offer[], offer: Offer) => offers.map((offerItem: Offer) => {
  if (offerItem.id === offer.id) {
    offerItem.isFavorite = !offerItem.isFavorite;
  }

  return offerItem;
});
