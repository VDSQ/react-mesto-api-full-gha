function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div
      className={`popup popup_type_image${isOpen ? " popup_is-opened" : ""}`}
    >
      <div className="popup__image-container">
        <button
          className="button popup__button-close"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <img className="popup__image-img" src={card.link} alt={card.name} />
        <p className="popup__image-text">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
