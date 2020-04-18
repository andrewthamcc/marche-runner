import { useState } from "react";

// custom modal hook to be used with modals and opening/closing
const useModal = () => {
  const [open, onOpenModal] = useState(false);
  const [close, onCloseModal] = useState(false);

  const openModal = () => {
    onOpenModal(true);
  };

  const closeModal = () => {
    onCloseModal(true);
    onOpenModal(false);
  };

  return { open, close, openModal, closeModal };
};

export default useModal;
