import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const ModalPopup = ({ title, children, showModal, setShowModal, onSave }) => {
  const handleHide = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button type="submit" variant="primary" onClick={onSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalPopup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ModalPopup;
