import PropTypes from "prop-types";
import { useRef } from "react";

import ModalPopup from "../../../common/modal/modalPopup";
import TransactCreationForm from "./transactCreationForm";
import { useEventListener } from "../../../../hooks";

const TransactCreationModal = ({ user, showModal, setShowModal }) => {
  const transactFormRef = useRef(null);

  const handleModalSave = () => {
    const isDataValid = transactFormRef.current.handleSubmit();

    if (isDataValid) {
      console.log(isDataValid);
      setShowModal(false);
    }
  };

  const handleKeyPress = ({ keyCode }) => {
    if (keyCode === 13) {
      transactFormRef.current.handleSubmit();
    }
  };

  useEventListener("keydown", handleKeyPress);

  return (
    <ModalPopup
      title="Новый Расход"
      onSave={handleModalSave}
      {...{ showModal, setShowModal }}
    >
      <TransactCreationForm user={user} ref={transactFormRef} />
    </ModalPopup>
  );
};

TransactCreationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default TransactCreationModal;
