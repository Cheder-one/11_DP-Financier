import PropTypes from "prop-types";

import ModalPopup from "../../../common/modal/modalPopup";
import { useRef } from "react";

const TransactCreationModal = ({ showModal, setShowModal }) => {
  const accountFormRef = useRef(null);

  const handleModalSave = () => {
    const isDataValid = accountFormRef.current.handleSubmit();

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
      <h1>Блять</h1>
    </ModalPopup>
  );
};

// TransactCreationModal.propTypes = {
//   showModal: PropTypes.bool.isRequired,
//   setShowModal: PropTypes.func.isRequired
// };

export default TransactCreationModal;
