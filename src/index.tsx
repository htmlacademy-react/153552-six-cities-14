import React from 'react';
import ReactDOM from 'react-dom/client';
import { Offer } from './types';
import { API_OFFERS_URL } from './api/api';
import { favoritesOffers } from './mocks/favorites';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// @TODO потом это куда-то переместить - в стор или еще куда
const offers: Offer[] = await fetch(API_OFFERS_URL)
  .then((response) => response.json())
  .then((res: Offer[]) => res);

root.render(
  <React.StrictMode>
    <App offers={offers} favoritesOffers={favoritesOffers}/>
  </React.StrictMode>
);
