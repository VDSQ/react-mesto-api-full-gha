import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cardElements = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
          <button
            type="button"
            className="profile__button-avatar"
            aria-label="Редактировать аватар профиля"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="button profile__button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button profile__button-card"
          aria-label="Добавить новую карточку"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards">{cardElements}</section>
    </main>
  );
}

export default Main;
