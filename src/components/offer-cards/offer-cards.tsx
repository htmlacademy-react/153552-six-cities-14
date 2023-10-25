import { useState } from 'react';
import { Offer } from '../../types';
import OfferCard from '../../components/offer-card/offer-card';

export type OfferCardsProps = {
  offers: Offer[];
  cardType: string;
  handleActiveOffer?: (offer: Offer) => void;
}

function OfferCards({offers, cardType, handleActiveOffer}: OfferCardsProps): JSX.Element {
  const [ , setActiveOffer ] = useState(offers?.[0]);

  const updateActiveOffer = (value: Offer) => {
    setActiveOffer(value);
    if (handleActiveOffer) {
      handleActiveOffer(value);
    }
  };

  return (
    <div className={
      `${cardType === 'city' ? 'places__list tabs__content cities__places-list' : ''}
      ${cardType === 'favorite' ? 'favorites__places' : ''}
      ${cardType === 'near-places' ? 'near-places__list places__list' : ''}`
    }
    >
      {offers.map((offer) => <OfferCard cardType={cardType} offer={offer} key={offer.id} updateActiveOffer={updateActiveOffer} />)}
    </div>
  );
}

export default OfferCards;
