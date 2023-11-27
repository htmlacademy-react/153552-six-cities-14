import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { AppRoute, AuthStatus } from '../../const';
import { Offer } from '../../types';
import { getRating } from '../../utils';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/autorization-status-data/selectors';
import { addFavoritesAction, removeFavoritesAction } from '../../store/api-actions';
import { updateOffers } from '../../store/offers-data/offers-data';
import { capitalizeFirstLetter } from '../../utils';

type OfferCardProps = {
  offer: Offer;
  cardType?: string;
  onUpdateActiveOffer?: (offer: Offer) => void;
  onClearHoveredOffer?: () => void;
  onToggleFavoriteOffer: () => void;
}

function getLinkToOffer(id: number) {
  return `${AppRoute.Offer}${id}`;
}

function OfferCard({ offer, cardType, onUpdateActiveOffer, onClearHoveredOffer, onToggleFavoriteOffer }: OfferCardProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);

  function handleMouseHover(): void {
    if(onUpdateActiveOffer) {
      onUpdateActiveOffer(offer);
    }
  }

  function handleMouseOut(): void {
    if(onClearHoveredOffer) {
      onClearHoveredOffer();
    }
  }

  const toggleFavorite = async (favoriteOffer: Offer) => {
    if (authorizationStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const { isFavorite } = favoriteOffer;
    const { payload } = isFavorite ? await dispatch(removeFavoritesAction(favoriteOffer)) : await dispatch(addFavoritesAction(favoriteOffer));
    dispatch(updateOffers(payload as Offer));
    onToggleFavoriteOffer();
  };

  return (
    <article
      data-testid="offer__card__id"
      onMouseOver={handleMouseHover}
      onMouseOut={handleMouseOut}
      className={
        `place-card 
        ${cardType === 'city' ? 'cities__card' : ''}
        ${cardType === 'favorite' ? 'favorites__card' : ''}
        ${cardType === 'near-places' ? 'near-places__card' : ''}`
      }
    >
      <div className="visually-hidden">Offer card</div>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={
        `place-card__image-wrapper 
        ${cardType === 'city' ? 'cities__image-wrapper' : ''} 
        ${cardType === 'favorite' ? 'favorites__image-wrapper' : ''}
        ${cardType === 'near-places' ? 'near-places__image-wrapper' : ''}`
      }
      >
        <img
          src={offer.previewImage}
          alt="Place image"
          className={`place-card__image ${cardType === 'favorite' ? 'favorites__image' : ''}`}
        />
      </div>
      <div className={`place-card__info ${cardType === 'favorite' ? 'favorites__card-info' : ''}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            type="button"
            className={`place-card__bookmark-button button ${offer.isFavorite && authorizationStatus === AuthStatus.Auth ? 'place-card__bookmark-button--active' : ''}`}
            onClick={ () => {
              toggleFavorite(offer);
            } }
          >
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
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
