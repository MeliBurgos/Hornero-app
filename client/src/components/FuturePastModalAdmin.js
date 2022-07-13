import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsTrashFill, BsShareFill } from "react-icons/bs";
import { useState } from "react";


import ShareModal from "./ShareModal";

const FuturePastModalAdmin = ({
  showAllReservas,
  setShowAllReservas,
  officeNameOk,
  setDate,
  handleFloorSelector,
  handleCancelReserve,
}) => {
  const darkMode = useSelector((state) => state.darkMode);
  const allReservations = useSelector((state) => state.reservations);
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <>
      <Modal show={showAllReservas} onHide={() => setShowAllReservas(false)} centered>
        <Modal.Header className={darkMode ? "dark-mode" : "light"} closeButton>
          <Modal.Title>
            {showAllReservas === "anteriores"
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
                <th>Usuario</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { allReservations === null ? ("No hay reservas") : (
              allReservations.map((reserva, i) => {
                return (
                  <tr
                    key={i}
                    onClick={() => {
                      setDate(reserva.start.split("T")[0]);
                      setShowAllReservas(false);
                      handleFloorSelector(
                        reserva.booking.split("D")[0].slice(1),
                        reserva.office.name.replace(/\s+/g, "_").toLowerCase()
                      );
                    }}
                  >
                    <td>{`${reserva.start.split("T")[0]} ${
                      reserva.start.split("T")[1]
                    }hs`}</td>
                    <td>{reserva.booking}</td>
                    <td>{reserva.user.name}</td>
                    {showAllReservas === "futuras" && (
                      <>
                        <td>
                          <BsShareFill
                            onClick={() =>
                              setShowShareModal(    {
                                desk: reserva.booking,
                                reserve: { start: reserva.start },
                              })
                            }
                          />
                        </td>
                        <td>
                          <BsTrashFill
                            onClick={() => handleCancelReserve(reserva)}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                );
              }))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className={darkMode ? "dark-mode" : "light"}>
          <button
            className="main-button"
            onClick={() => setShowAllReservas(false)}
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
      {showShareModal && (
        <ShareModal
          showModal={showShareModal}
          setShowModal={setShowShareModal}
          officeNameOk={officeNameOk}
        />
      )}
    </>
  );
};

export default FuturePastModalAdmin;
