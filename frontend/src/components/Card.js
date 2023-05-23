import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardDeleteButtonClassName = `button ${
    isOwn ? "card__button-remove_visible" : "card__button-remove_hidden"
  }`;
  const cardLikeButtonClassName = `button card__button-like ${
    isLiked ? "card__button-like_active" : "card__button-like_inactive"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card._id);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        type="button"
        onClick={handleDelete}
      />
      <div className="card__scription">
        <h2 className="card__scription-title">{card.name}</h2>
        <div className="card__like">
          <button
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            type="button"
            onClick={handleLike}
          />
          <span className="card__like-amount">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
