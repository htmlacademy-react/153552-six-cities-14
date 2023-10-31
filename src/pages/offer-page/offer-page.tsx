import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Comment, Offer } from '../../types';
import { apiUrls } from '../../api/urls';
import { getRating, capitalizeFirstLetter } from '../../utils';
import Header from '../../components/header/header';
import CommentForm from '../../components/comment-form/comment-form';
import CommentsList from '../../components/comments-list/comments-list';
import Map from '../../components/map/map';
import OfferCards from '../../components/offer-cards/offer-cards';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferFeatures from '../../components/offer-features/offer-features';
import OfferHost from '../../components/offer-host/offer-host';

function OfferPage(): JSX.Element {
  const id = useParams()?.id;
  const [comments, setComments] = useState<Comment[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [offersNearby, setOffersNearby] = useState<Offer[]>([]);

  useEffect(() => {
    // @TODO переедет в Redux
    const fetchComments = async() => {
      await fetch(`${apiUrls.GET_COMMENTS}/${id}`)
        .then((res) => res.json())
        .then((res: Comment[]) => setComments(res));
    };

    fetchComments();

    const fetchOffer = async() => {
      await fetch(`${apiUrls.GET_OFFERS}/${id}`)
        .then((res) => res.json())
        .then((res: Offer) => setOffer(res));
    };

    fetchOffer();

    const fetchOffersNearby = async() => {
      await fetch(`${apiUrls.GET_OFFERS}/${id}/nearby`)
        .then((res) => res.json())
        .then((res: Offer[]) => setOffersNearby(res));
    };

    fetchOffersNearby();
  }, [id]);

  return (
    <div className="page">
      <Helmet>
        <title>Проект 6 городов - страница отеля</title>
      </Helmet>
      <Header />

      {offer &&
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery picsUrls={offer.images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: getRating(offer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(offer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} {offer.maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferFeatures features={offer.goods} />
              <div className="offer__host">
                <OfferHost host={offer.host} />
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {
                  comments.length > 0 &&
                  <h2 className="reviews__title">{comments.length > 1 ? 'Reviews' : 'Review'} &middot;
                    <span className="reviews__amount"> {comments.length}</span>
                  </h2>
                }
                {comments.length > 0 && <CommentsList comments={comments} />}
                <CommentForm />
              </section>
            </div>
          </div>
          {offer && <Map offers={[...offersNearby, offer]} activeOffer={offer} type="offer"/>}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {offersNearby && <OfferCards offers={offersNearby} cardType="near-places" /> }
          </section>
        </div>
      </main>}
    </div>
  );
}

export default OfferPage;
