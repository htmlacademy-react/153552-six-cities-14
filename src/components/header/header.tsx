import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { AppRoute, AuthStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/autorization-status-data/selectors';
import { getUserInfo } from '../../store/user-data/selectors';
import { getFavorites } from '../../store/favorites-data/selectors';
import { updateUserInfo } from '../../store/user-data/user-data';
import { updateFavoriteOffers } from '../../store/favorites-data/favorites-data';

export default function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userInfoData = useSelector(getUserInfo);
  const favoritesInfo = useSelector(getFavorites);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(updateUserInfo(null));
    dispatch(updateFavoriteOffers([]));
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper" data-testid="header__id">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <div className="visually-hidden">Header</div>
          {authorizationStatus === AuthStatus.Auth &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {userInfoData &&
                  <li className="header__nav-item user">
                    <div
                      style={{backgroundImage: `url(${userInfoData.avatarUrl})`}}
                      className="header__avatar-wrapper user__avatar-wrapper"
                    >
                    </div>
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <span className="header__user-name user__name">
                        {userInfoData.email}
                      </span>
                    </Link>
                    <span className="header__favorite-count">
                      {favoritesInfo.length}
                    </span>
                  </li>}
                <li className="header__nav-item">
                  <span className="header__nav-link is-clickable" onClick={handleLogout}>
                    <span className="header__signout">Sign out</span>
                  </span>
                </li>
              </ul>
            </nav>}
          {authorizationStatus === AuthStatus.NoAuth &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}
