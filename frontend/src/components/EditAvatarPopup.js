import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setAvatar("");
    }
  }, [avatar, isOpen]);

  function handleAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={true}
    >
      <input
        className="popup__input popup__input_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        value={avatar || ""}
        onChange={handleAvatar}
        required
      />
      <span className="popup__error popup__error_avatar" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
