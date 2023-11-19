export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  location: Location;
  name: string;
};

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: User;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

export type AuthData = {
  login: string;
  password: string;
};

export type Review = {
  comment: string;
  rating: number;
}
