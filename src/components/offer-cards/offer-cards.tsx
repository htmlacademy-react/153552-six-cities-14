import { useState } from 'react';
import { Offer } from '../../types';
import OfferCard from '../../components/offer-card/offer-card';

export type OfferCardsProps = {
  offers: Offer[];
  handleActiveOffer: (offer: Offer) => void;
}

function OfferCards({offers, handleActiveOffer}: OfferCardsProps): JSX.Element {
  const [ , setActiveOffer ] = useState(offers?.[0]);

  const updateActiveOffer = (value: Offer) => {
    setActiveOffer(value);
    handleActiveOffer(value);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard cardType="city" offer={offer} key={offer.id} updateActiveOffer={updateActiveOffer} />)}
    </div>
  );
}

export default OfferCards;
