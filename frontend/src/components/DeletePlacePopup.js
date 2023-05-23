import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ isOpen, onClose, card_id, onDeletePlace }) {
  function handleSubmit(e) {
    e.preventDefault();

    onDeletePlace(card_id);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={true}
    />
  );
}

export default DeletePlacePopup;
