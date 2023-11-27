import { useState } from 'react';
import { Offer } from '../../types';
import OfferCard from '../../components/offer-card/offer-card';

export type OfferCardsProps = {
  offers: Offer[];
  cardType: string;
  onHandleActiveOffer?: (offer: Offer) => void;
  onRemoveHoveredOffer?: () => void;
  onHandleFavoriteToggling?: () => void | Promise<void>;
}

function OfferCards({ offers, cardType, onHandleActiveOffer, onRemoveHoveredOffer, onHandleFavoriteToggling }: OfferCardsProps): JSX.Element {
  const [ , setActiveOffer ] = useState(offers?.[0]);

  const onUpdateActiveOffer = (value: Offer) => {
    setActiveOffer(value);

    if (onHandleActiveOffer) {
      onHandleActiveOffer(value);
    }
  };

  const onClearHoveredOffer = () => {
    if (onRemoveHoveredOffer) {
      onRemoveHoveredOffer();
    }
  };

  const onToggleFavoriteOffer = () => {
    if (onHandleFavoriteToggling) {
      onHandleFavoriteToggling();
    }
  };

  return (
    <div
      id="cards__id"
      data-testid="cards__id"
      className={
        `${cardType === 'city' ? 'places__list tabs__content cities__places-list' : ''}
        ${cardType === 'favorite' ? 'favorites__places' : ''}
        ${cardType === 'near-places' ? 'near-places__list places__list' : ''}`
      }
    >
      {offers.map((offer) => <OfferCard cardType={cardType} offer={offer} key={offer.id} onUpdateActiveOffer={onUpdateActiveOffer} onClearHoveredOffer={onClearHoveredOffer} onToggleFavoriteOffer={onToggleFavoriteOffer} />)}
    </div>
  );
}

export default OfferCards;
