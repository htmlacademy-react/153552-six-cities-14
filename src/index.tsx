import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { favoritesOffers } from './mocks/favorites';
import { store } from './store';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import App from './components/app/app';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App favoritesOffers={favoritesOffers}/>
    </Provider>
  </React.StrictMode>
);
