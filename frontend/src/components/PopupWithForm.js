function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
  children,
}) {
  const buttonSubmitClassName = `button popup__button-submit ${
    isFormValid ? "" : "popup__button-submit_invalid"
  }`;

  return (
    <div
      className={`popup popup_type_${name}${isOpen ? " popup_is-opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="button popup__button-close"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={buttonSubmitClassName}
            type="submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
