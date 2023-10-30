import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Offer } from '../../types';
import { Cities } from '../../const';
import { getOffers } from '../../store/offers-data/selectors';
import { getCity } from '../../store/city-data/selectors';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import OfferCards from '../../components/offer-cards/offer-cards';
import Map from '../../components/map/map';

function HomePage(): JSX.Element {
  const offers = useSelector(getOffers);
  const activeCity = useSelector(getCity);

  const filterOffers = (city: keyof typeof Cities) => offers.filter((offer: Offer) => offer.city.name === city);

  const [ activeOffer, setActiveOffer ] = useState<Offer>(filterOffers(Cities.Paris)[0]);

  const filteredOffers = useMemo(() => {
    if (!offers.length) {
      return [];
    }

    setActiveOffer(filterOffers(activeCity)[0]);

    return filterOffers(activeCity);
  }, [offers, activeCity]);


  const updateActiveOffer = (value: Offer) => {
    setActiveOffer(value);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Проект 6 городов</title>
      </Helmet>
      <Header />

      <main className={`page__main page__main--index ${!offers.length ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs />
        <div className="cities">
          {filteredOffers.length > 0 &&
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filteredOffers.length} places to stay in {activeCity}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <OfferCards offers={filteredOffers} handleActiveOffer={updateActiveOffer} cardType="city" />
              </section>
              <div className="cities__right-section">
                <Map offers={filteredOffers} activeOffer={activeOffer} type="city" isActiveOfferOrange />
              </div>
            </div>}

          {filteredOffers.length === 0 &&
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
