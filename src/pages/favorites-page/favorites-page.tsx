import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types';
import Header from '../../components/header/header';
import OfferCards from '../../components/offer-cards/offer-cards';

type FavoritesPageProps = {
  favoritesOffers: Offer[];
}

function FavoritesPage({favoritesOffers}: FavoritesPageProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>Проект 6 городов - избранное</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <OfferCards offers={favoritesOffers} cardType="favorite" />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <OfferCards offers={favoritesOffers} cardType="favorite" />
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
