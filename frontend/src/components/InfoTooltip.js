import successIcon from "../images/icon-success.svg";
import errorIcon from "../images/icon-error.svg";

function InfoTooltip({ isOpen, onClose, isAuthStatusSuccess }) {
  return (
    <div
      className={`popup popup_type_infotooltip${
        isOpen ? " popup_is-opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="button popup__button-close"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          src={isAuthStatusSuccess ? successIcon : errorIcon}
          className="popup__icon"
          alt={isAuthStatusSuccess ? "Success" : "Error"}
        />
        <p className="popup__text">
          {isAuthStatusSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
