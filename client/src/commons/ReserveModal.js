import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ReserveModal = ({ show, handleClose }) => {
  return (
    <>
      {/* Este es el modal para reservar un lugar de trabajo */}
      {/* Tiene que tener la lista de dias y horarios habilitados */}

      {/* MODAL DE EJEMPLO PARA MODIFICAR */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReserveModal;
