import PropTypes from "prop-types";

import ModalPopup from "../../../common/modal/modalPopup";
import AccountCreationForm from "./accountCreationForm";

const AccountCreationModal = ({ showModal, setShowModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);

    // console.log(inputFields);
    console.log("Form submitted!");
  };

  return (
    <ModalPopup
      title="Новый Счет"
      onSave={handleSubmit}
      {...{ showModal, setShowModal }}
    >
      <AccountCreationForm />
    </ModalPopup>
  );
};

AccountCreationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default AccountCreationModal;
