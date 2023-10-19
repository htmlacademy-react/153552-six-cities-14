import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AutoriztionStatus } from '../../const';
import { HomePageProps } from '../../pages/home-page/home-page';
import HomePage from '../../pages/home-page/home-page';
import ErrorPage from '../../pages/error-page/error-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

function App(props: HomePageProps): JSX.Element {
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
              <PrivateRoute autoriztionStatus={AutoriztionStatus.NoAuth}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Offer}
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
