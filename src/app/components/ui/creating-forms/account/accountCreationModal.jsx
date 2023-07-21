import PropTypes from "prop-types";

import ModalPopup from "../../../common/modal/modalPopup";
import AccountCreationForm from "./accountCreationForm";
import { useRef } from "react";

const AccountCreationModal = ({ showModal, setShowModal }) => {
  const accountFormRef = useRef(null);

  const handleModalSave = () => {
    setShowModal(false);

    accountFormRef.current.handleSubmit();
  };

  return (
    <ModalPopup
      title="Новый Счет"
      onSave={handleModalSave}
      {...{ showModal, setShowModal }}
    >
      <AccountCreationForm ref={accountFormRef} />
    </ModalPopup>
  );
};

AccountCreationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default AccountCreationModal;
