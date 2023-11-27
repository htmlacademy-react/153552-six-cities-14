import { useState, useMemo, useEffect } from 'react';
import { ChangeEvent } from 'react';
import { Review } from '../../types';
import { EMPTY_REVIEW, COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH } from '../../const';

type CommentFormProps = {
  isBlocked?: boolean;
  isCommentSent?: boolean;
  isCommentSendingMistake?: boolean;
  onCommentSend: (review: Review) => Promise<void>;
}

export default function CommentForm({ isBlocked, isCommentSent, isCommentSendingMistake, onCommentSend }: CommentFormProps): JSX.Element {
  const [formData, setFormData] = useState(EMPTY_REVIEW);

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    if (name === 'rating') {
      setFormData({...formData, rating: parseInt(value, 10)});
    }
    if (name === 'comment') {
      setFormData({...formData, comment: value});
    }
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onCommentSend(formData);
  };

  const isFormValid = useMemo(
    () => formData.rating > 0 && formData.comment.length >= COMMENT_MIN_LENGTH && formData.comment.length <= COMMENT_MAX_LENGTH,
    [formData]);

  useEffect(() => {
    if (isCommentSent) {
      setFormData(EMPTY_REVIEW);
      const ratingElement = document.getElementById(`${formData.rating}-star${formData.rating > 1 ? 's' : ''}`) as HTMLInputElement;

      if (ratingElement) {
        ratingElement.checked = false;
      }
    }
  }, [isCommentSent, isCommentSendingMistake]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      id="create-course-form"
      onSubmit={handleSubmit}
    >
      <div className="visually-hidden">Comment form</div>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className={`reviews__rating-form form__rating ${isBlocked ? 'form__rating--blocked' : ''}`}>
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleFieldChange} disabled={isBlocked} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleFieldChange} disabled={isBlocked} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label form__rating-label--active" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleFieldChange} disabled={isBlocked} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleFieldChange} disabled={isBlocked} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleFieldChange} disabled={isBlocked} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        value={formData.comment}
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isBlocked}
        onChange={handleFieldChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className={`reviews__submit form__submit button ${isBlocked && 'reviews__submit--blocked'}`} type="submit" disabled={!isFormValid || isBlocked}>Submit</button>
      </div>
    </form>
  );
}
