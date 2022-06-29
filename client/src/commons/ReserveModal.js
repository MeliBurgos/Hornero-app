import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button";
import Calendario from "./Calendario";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ReserveModal = ({ show, setShow }) => {

  const dispatch = useDispatch()

  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [reserve, setReserve] = useState({})

  const handleReserve = () => {
    if (!reserve.start) {
      setShow1(true)
      setShow(false)
    } else {
      setShow(false)
      setShow2(true)
    }
  }

  let reserveConfirmation /* = async () => {
    try {
      const res = await dispatch( RUTADELBACK (reserve))
      setShow2(false)
      setShow3(true)
      setReserve({})
    } catch (error) {
      console.log(error)
    }
  } */

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
      <Alert variant="danger" show={show1} onClose={() => (setShow(true), setShow1(false))} dismissible>
        <Alert.Heading>¡Atención!</Alert.Heading>
        <p>
          No se ha seleccionado <strong>ninguna</strong> fecha para la reserva.
        </p>
      </Alert>

      <Alert variant="warning" show={show2} onClose={() => setShow2(false)} dismissible>
        <Alert.Heading>Confrimación:</Alert.Heading>
        <p>
          Esta seguro que quiere reservar para <strong>{`${reserve.start}`}</strong> ?
        </p>
        <hr></hr>
        <Button className={"mx-2"} onClick={() => (reserveConfirmation())} variant="outline-dark">
          Confirmar
        </Button>
      </Alert>

      <Alert variant="success" show={show3} onClose={() => setShow3(false)} dismissible>
        <Alert.Heading>¡Éxito!</Alert.Heading>
        <p>
          Reseva <strong> cofirmada </strong>. ¡Te esperamos!
        </p>
        <hr></hr>
      </Alert>

      <Modal show={show} onHide={() => setShow(false)} centered >
        <Modal.Header closeButton>
          <Modal.Title>Seleccione dia y hora</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendario setReserve={setReserve} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleReserve()}>
            Reservar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReserveModal;
