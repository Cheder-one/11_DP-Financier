import PropTypes from "prop-types";
import { useRef } from "react";

import ModalPopup from "../../../common/modal/modalPopup";
import TransactCreationForm from "./transactCreationForm";

const TransactCreationModal = ({ showModal, setShowModal }) => {
  const transactFormRef = useRef(null);

  const handleModalSave = () => {
    const isDataValid = transactFormRef.current.handleSubmit();

    if (isDataValid) {
      console.log(isDataValid);
      setShowModal(false);
    }
  };

  return (
    <ModalPopup
      title="Новая операция"
      onSave={handleModalSave}
      {...{ showModal, setShowModal }}
    >
      <TransactCreationForm ref={transactFormRef} />
    </ModalPopup>
  );
};

TransactCreationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default TransactCreationModal;
