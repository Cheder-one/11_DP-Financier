import { Button } from "bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const ModalPopup = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSaveChanges = () => {
    return null;
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Заголовок модального окна</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Содержимое модального окна */}
        <p>Тут может быть ваше содержимое модального окна.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
