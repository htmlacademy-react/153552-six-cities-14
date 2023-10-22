import { useState } from 'react';
import { Offer } from '../../types';
import OfferCard from '../../components/offer-card/offer-card';

export type OfferCardsProps = {
  offers: Offer[];
}

function OfferCards({offers}: OfferCardsProps): JSX.Element {
  const [ activeOffer, setActiveOffer ] = useState(offers?.[0]);

  const updateActiveOffer = (value: Offer) => {
    setActiveOffer(value);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {activeOffer?.id}
      {offers.map((offer) => <OfferCard cardType="city" offer={offer} key={offer.id} updateActiveOffer={updateActiveOffer}/>)}
    </div>
  );
}

export default OfferCards;
