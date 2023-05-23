import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [name, link, isOpen]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={true}
    >
      <input
        className="popup__input popup__input_name"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleName}
        required
      />
      <span className="popup__error popup__error_name" />
      <input
        className="popup__input popup__input_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={link || ""}
        onChange={handleLink}
        required
      />
      <span className="popup__error popup__error_link" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
