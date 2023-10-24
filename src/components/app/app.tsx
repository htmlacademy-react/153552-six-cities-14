import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AutoriztionStatus } from '../../const';
import { Offer } from '../../types';
import HomePage from '../../pages/home-page/home-page';
import ErrorPage from '../../pages/error-page/error-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: Offer[];
  favoritesOffers: Offer[];
}

function App(props: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<HomePage {...props} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute autoriztionStatus={AutoriztionStatus.Auth}>
                <FavoritesPage favoritesOffers={props.favoritesOffers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={`${AppRoute.Offer}:id`}
            element={<OfferPage />}
          />
          <Route
            path='*'
            element={<ErrorPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
