import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsTrashFill } from "react-icons/bs";

const FuturePastModal = ({
  showReservas,
  setShowReservas,
  setDate,
  handleFloorSelector,
  handleCancelReserve,
}) => {
  const darkMode = useSelector(state => state.darkMode)
  const userReservations = useSelector((state) => state.userReservations);

  return (
    <Modal show={showReservas} onHide={() => setShowReservas(false)} centered>
      <Modal.Header className={darkMode ? "dark-mode" : "light"}>
        <Modal.Title>
          {showReservas === "anteriores"
            ? "Reservas Pasadas"
            : "Reservas Futuras"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={darkMode ? "dark-mode" : "light"}>
        <Table className={darkMode ? "dark-mode" : "light"}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Lugar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userReservations.map((reserva, i) => {
              return (
                <tr
                  key={i}
                  onClick={() => {
                    setDate(reserva.start.split("T")[0]);
                    setShowReservas(false);
                    handleFloorSelector(
                      reserva.booking.split("D")[0].slice(1),
                      reserva.office.name.replace(/\s+/g, "_").toLowerCase()
                    );
                  }}
                >
                  <td>{`${reserva.start.split("T")[0]} ${
                    reserva.start.split("T")[1]
                  }hs`}</td>
                  <td>{`${reserva.office.name} ${reserva.booking}`}</td>
                  {showReservas === "futuras" && (
                    <td>
                      <BsTrashFill
                        onClick={() => handleCancelReserve(reserva._id)}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer className={darkMode ? "dark-mode" : "light"}>
        <button className="main-button" onClick={() => setShowReservas(false)}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FuturePastModal;
