import PropTypes from "prop-types";
import { useRef } from "react";

import ModalPopup from "../../../common/modal/modalPopup";
import AccountCreationForm from "./accountCreationForm";
import { useEventListener } from "../../../../hooks";

const AccountCreationModal = ({
  user,
  onSuccess,
  showModal,
  setShowModal
}) => {
  const accountFormRef = useRef(null);

  const handleModalSave = () => {
    const isDataValid = accountFormRef.current.handleSubmit();

    if (isDataValid) {
      setShowModal(false);
    }
  };

  const handleKeyPress = ({ keyCode }) => {
    if (keyCode === 13) {
      const isFormValid = accountFormRef.current.handleSubmit();

      if (isFormValid) {
        setShowModal(false);
      }
    }
  };

  useEventListener("keydown", handleKeyPress);

  return (
    <ModalPopup
      title="Новый Счет"
      onSave={handleModalSave}
      {...{ showModal, setShowModal }}
    >
      <AccountCreationForm
        user={user}
        onSuccess={onSuccess}
        ref={accountFormRef}
      />
    </ModalPopup>
  );
};

AccountCreationModal.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default AccountCreationModal;
