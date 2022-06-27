import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";

const ReserveModal = ({ desk, show, setShow }) => {
  const [addedToFavorites, setAddedToFavorites] = useState(false)

  const handleReserve = () => {
    // tiene que hacer la reserva en el back
    setShow(false)
  }

  const handleRemoveFromFavorites = (deskId) => {
    // pedido al back para eliminar 1 favorito
    setAddedToFavorites(false)
  }

  const handleAddToFavorites = (deskId) => {
    // pedido al back para agregar 1 favorito
    setAddedToFavorites(true)
  }

  return (
    <>
      <Modal show={show} onHide={()=>setShow(false)} centered >
        <Modal.Header>
          <Modal.Title>{`Puesto ${desk.name}`}</Modal.Title>
          {addedToFavorites ? <button className="main-button-black" onClick={()=>handleRemoveFromFavorites(desk.id)}>
          <BsDashCircle size={24}/> Favoritos
          </button> : <button className="main-button" onClick={()=>handleAddToFavorites(desk.id)}>
          <BsPlusCircle size={24}/> Favoritos
          </button>}
        </Modal.Header>
        <Modal.Body>// selector de dias y horarios</Modal.Body>
        <Modal.Footer>
          <button className="main-button-black" onClick={()=>setShow(false)}>
            Cerrar
          </button>
          <button className="main-button" onClick={handleReserve}>
            Reservar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReserveModal;
