import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const isFormValid = !(nameError || descriptionError);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    } else {
      setNameError("");
      setDescriptionError("");
    }
  }, [currentUser, isOpen]);

  function handleName(e) {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError("");
    } else {
      setNameError(e.target.validationMessage);
    }
  }

  function handleDescription(e) {
    setDescription(e.target.value);
    if (e.target.validity.valid) {
      setDescriptionError("");
    } else {
      setDescriptionError(e.target.validationMessage);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        className="popup__input popup__input_name"
        type="text"
        name="name"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleName}
        required
      />
      <span className="popup__error popup__error_name">{nameError}</span>

      <input
        className="popup__input popup__input_about"
        type="text"
        name="about"
        placeholder="Ваша деятельность"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescription}
        required
      />
      <span className="popup__error popup__error_about">
        {descriptionError}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
