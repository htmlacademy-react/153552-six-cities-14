import { Cities, CityName } from '../const';

export const getRating = (rating: number) => `${Math.round(rating) * 20}%`;

export const getMonthYearDate = (date: string) => new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });

export const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const getRandomCity = (): CityName => Cities[Math.floor(Math.random() * Cities.length)];
