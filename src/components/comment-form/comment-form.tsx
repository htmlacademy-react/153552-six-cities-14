import { useState, useMemo, useRef } from 'react';
import { ChangeEvent } from 'react';
import { Review } from '../../types';
import { EMPTY_REVIEW, REVIEW_MIN_LENGTH, REVIEW_MAX_LENGTH } from '../../const';

type CommentFormProps = {
  isBlocked?: boolean;
  onCommentSend: (review: Review) => Promise<void>;
}

export default function CommentForm({ isBlocked, onCommentSend }: CommentFormProps): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState(EMPTY_REVIEW);

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onCommentSend(formData);
    setFormData(EMPTY_REVIEW);

    const ratingElement = document.getElementById(`${formData.rating}-star${formData.rating > 1 ? 's' : ''}`) as HTMLInputElement;

    if (ratingElement) {
      ratingElement.checked = false;
    }
  };

  const isFormValid = useMemo(
    () => formData.rating > 0 && formData.comment.length >= REVIEW_MIN_LENGTH && formData.comment.length <= REVIEW_MAX_LENGTH,
    [formData]);

  return (
    <form
      ref={formRef}
      className="reviews__form form"
      action="#"
      method="post"
      id="create-course-form"
      onSubmit={handleSubmit}
    >
      <div className="visually-hidden">Comment form</div>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleFieldChange} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleFieldChange} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleFieldChange} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleFieldChange} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleFieldChange} />
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
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
}
