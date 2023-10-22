import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types';

type OfferCardProps = {
  offer: Offer;
  cardType?: string;
  updateActiveOffer?: (offer: Offer) => void;
}

function getRating(rating: number) {
  return Math.round(rating * 100 / 5);
}

function getLinkToOffer(id: number) {
  return `${AppRoute.Offer}${id}`;
}

function OfferCard({offer, cardType, updateActiveOffer}: OfferCardProps): JSX.Element {
  function handleMouseHover(): void {
    if(updateActiveOffer) {
      updateActiveOffer(offer);
    }
  }

  return (
    <article
      onMouseOver={handleMouseHover}
      className={
        `place-card 
        ${cardType === 'city' ? 'cities__card' : ''}
        ${cardType === 'favorite' ? 'favorites__card' : ''}`
      }
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${cardType === 'city' ? 'cities__image-wrapper' : ''} ${cardType === 'favorite' ? 'favorites__image-wrapper' : ''}`}>
        <Link to={getLinkToOffer(offer.id)}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className={`place-card__info ${cardType === 'favorite' ? 'favorites__card-info' : ''}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRating(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={getLinkToOffer(offer.id)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
