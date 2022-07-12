import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillShareFill, BsDashCircle, BsPlusCircle } from "react-icons/bs";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";

import { getReservations, newReservation } from "../store/reservations";
import { getFavorites, removeFavorite, addFavorite } from "../store/favorites";


const MeetingRoomModal = ({
  Show,
  setShow,
  officeNameOk,
  handleCancelReserve,
  selectedOffice,
  date,
}) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const [hour, setHour] = useState("09:00")
  const [selectedHour, setSelectedHour] = useState(null)
  const modules = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]

  useEffect(() => {
    setSelectedHour(Show.reserve.find(reserv => reserv.start === `${date}T${hour}`))
  }, [hour])

  const handleRemoveFromFavorites = async (desk) => {
    await dispatch(removeFavorite(`${officeNameOk}:${desk}`));
    dispatch(getFavorites());
  };

  const handleAddToFavorites = async (desk) => {
    await dispatch(addFavorite(`${officeNameOk}:${desk}`));
    dispatch(getFavorites());
  };


  //confirmacion de la reserva
  const reserveConfirmation = async () => {
    try {
      await dispatch(
        newReservation({
          start: `${date}T${hour}`,
          end: `${modules[modules.indexOf(hour)+1] ? modules[modules.indexOf(hour)+1] : "18:00"}`,
          allDay: false,
          user: user._id,
          booking: Show.desk,
          office: selectedOffice._id,
        })
      );
      await dispatch(getReservations(selectedOffice._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={Show} onHide={() => setShow("")} centered>
      {Show.desk && (
        <Modal.Header closeButton>
          <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-around' }}>
            <h2>{`Espacio ${Show.desk.split("D")[1]}`}</h2>

            {favorites.includes(`${officeNameOk}:${Show.desk}`) ? (
              <button
                style={{ marginBottom: "8px" }}
                className={"mx-2 ml-10 main-button-black"}
                onClick={() => handleRemoveFromFavorites(Show.desk)}
              >
                <BsDashCircle size={20} /> Favorito
              </button>
            ) : (
              <button
                style={{ marginBottom: "8px" }}
                className={"mx-2 ml-10 main-button"}
                onClick={() => handleAddToFavorites(Show.desk)}
              >
                <BsPlusCircle size={20} /> Favorito
              </button>
            )}
          </div>
        </Modal.Header>
      )}

      <Modal.Body className="text-center">
        <p>Los Meeting Rooms se reservan de a módulos de 30 minutos.</p>
        <strong>seleccioná un módulo</strong>


        <div className="mw-100" >
          {modules.map((module, i) => (Show.reserve.find(reserv => reserv.start.split("T")[1] === module)) ? <button key={i} className="groupedButtonReserved" onClick={() => setHour(module)}>{module}</button> : <button key={i} className="groupedButton" onClick={() => setHour(module)}>{module}</button>
            )}
        </div>

        {selectedHour ? (
          <>
             <div className="mt-3"><strong > {`Módulo ${hour}`} </strong> </div>

            <p> Reservado por </p>
            <p>
              <Image
                roundedCircle="true"
                thumbnail="true"
                src={selectedHour.user.imgUrl}
                style={{ width: "20%", height: "auto", maxWidth: "100px" }}
              />
              <strong>
                {" "}
                {selectedHour.user.name} {selectedHour.user.surname}{" "}
              </strong>
            </p>
            <span>
              Desde: <strong>{selectedHour.start.slice(-5)} hs</strong>
            </span>
            {" | "}
            <span>
              Hasta: <strong>{selectedHour.end} hs</strong>
            </span>
          </>

        ) : (
          <>
          <div className="mt-3"><strong > {`Módulo ${hour}`} </strong> </div>
            <p>
              {" "}
              Este módulo está <strong>libre</strong>.
            </p>{" "}
            <p>¡Hace tu reserva!</p>
          </>
        )}
      </Modal.Body> 
      <Modal.Footer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        {!selectedHour? (
          <button
            className={"mx-2 main-button"}
            onClick={() => reserveConfirmation()}
          >
            Reservar
          </button>
        ) : (
          selectedHour.user._id === user._id && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button className={"main-button"}><BsFillShareFill /> Compartir</button>
              <button
                className={"mx-2 main-button-black"}
                onClick={() => handleCancelReserve(selectedHour._id)}
              >
                Cancelar Reserva
              </button>
            </div>
          )
        )}
      </Modal.Footer>
    </Modal>
  )

}

export default MeetingRoomModal