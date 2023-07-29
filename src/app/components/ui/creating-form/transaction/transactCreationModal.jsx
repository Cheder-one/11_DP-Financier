import PropTypes from "prop-types";
import { useRef } from "react";

import ModalPopup from "../../../common/modal/modalPopup";
import TransactCreationForm from "./transactCreationForm";
import { useEventListener } from "../../../../hooks";

const TransactCreationModal = ({ user, cardType, showModal, setShowModal }) => {
  const transactFormRef = useRef(null);

  const getCardTitle = (cardType) => {
    return "Новый " + (cardType === "income" ? "Доход" : "Расход");
  };

  const handleModalSave = () => {
    const isDataValid = transactFormRef.current.handleSubmit();

    if (isDataValid) {
      setShowModal(false);
    }
  };

  const handleKeyPress = ({ keyCode }) => {
    if (keyCode === 13) {
      transactFormRef.current.handleSubmit();
      setShowModal(false);
    }
  };

  useEventListener("keydown", handleKeyPress);

  return (
    <ModalPopup
      title={getCardTitle()}
      onSave={handleModalSave}
      {...{ showModal, setShowModal }}
    >
      <TransactCreationForm
        user={user}
        cardType={cardType}
        ref={transactFormRef}
      />
    </ModalPopup>
  );
};

TransactCreationModal.propTypes = {
  user: PropTypes.object.isRequired,
  cardType: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default TransactCreationModal;
