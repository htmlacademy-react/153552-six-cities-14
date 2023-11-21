import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getAuthorizationStatus } from '../../store/autorization-status-data/selectors';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoute } from '../../const';
import HomePage from '../../pages/home-page/home-page';
import ErrorPage from '../../pages/error-page/error-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<HomePage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage />
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
      <ToastContainer />
    </HelmetProvider>
  );
}

export default App;
