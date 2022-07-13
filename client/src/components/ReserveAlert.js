import { useSelector, useDispatch } from "react-redux";
import { BsFillShareFill, BsDashCircle, BsPlusCircle } from "react-icons/bs";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import { getReservations, newReservation } from "../store/reservations";
import { getFavorites, removeFavorite, addFavorite } from "../store/favorites";
import ShareModal from "./ShareModal";
import { useState } from "react";

const ReserveAlert = ({
  Show,
  setShow,
  officeNameOk,
  handleCancelReserve,
  officeId,
  date,
  hour,
}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const [showShareModal, setShowShareModal] = useState(false);

  const userAdmin = JSON.parse(localStorage.getItem("user"));

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
          user: user._id,
          booking: Show.desk,
          office: officeId,
        })
      );
      await dispatch(getReservations(officeId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Alert variant="info" show={Show} onClose={() => setShow("")} dismissible>
      {Show.desk && (
        <Alert.Heading>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h2>{`Escritorio ${Show.desk.split("D")[1]}`}</h2>

            {favorites.includes(`${officeNameOk}:${Show.desk}`) ? (
              <button
                style={{ marginBottom: "8px" }}
                className={
                  darkMode ? "dark-mode-black-button" : "main-button-black"
                }
                onClick={() => handleRemoveFromFavorites(Show.desk)}
              >
                <BsDashCircle size={20} /> Favorito
              </button>
            ) : (
              <button
                style={{ marginBottom: "8px" }}
                className="main-button"
                onClick={() => handleAddToFavorites(Show.desk)}
              >
                <BsPlusCircle size={20} /> Favorito
              </button>
            )}
          </div>
        </Alert.Heading>
      )}
      <hr />
      {Show.reserve ? (
        <>
          <p> Reservado por </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "20%",
                aspectRatio: "1/1",
                maxWidth: "80px",
                marginRight: "10px",
              }}
              className="profilePhoto"
              src={Show.reserve.user.imgUrl}
            ></img>
            <p style={{ margin: "0px" }}>
              <strong>
                {Show.reserve.user.name} {Show.reserve.user.surname}
              </strong>
            </p>
          </div>
          <span>
            Desde: <strong>{Show.reserve.start.slice(-5)} hs</strong>
          </span>
          {" | "}
          <span>
            Hasta: <strong>{Show.reserve.end} hs</strong>
          </span>
        </>
      ) : (
        <>
          <p>
            {" "}
            Este escritorio está <strong>libre</strong>.
          </p>{" "}
          <p>¡Hace tu reserva!</p>
        </>
      )}

      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!Show.reserve ? (
          <button
            className={"mx-2 main-button"}
            onClick={() => reserveConfirmation()}
          >
            Reservar
          </button>
        ) : (
          Show.reserve.user._id === user._id ||
          (userAdmin.user.admin === true && (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                className={"main-button"}
                onClick={() => setShowShareModal(Show)}
              >
                <BsFillShareFill /> Compartir
              </button>
              <button
                className={
                  darkMode
                    ? "mx-2 dark-mode-black-button"
                    : "mx-2 main-button-black"
                }
                onClick={() => handleCancelReserve(Show.reserve._id)}
              >
                Cancelar Reserva
              </button>
            </div>
          ))
        )}
      </div>
      {showShareModal && Show.reserve && (
        <ShareModal
          showModal={showShareModal}
          setShowModal={setShowShareModal}
          officeNameOk={officeNameOk}
        />
      )}
    </Alert>
  );
};

export default ReserveAlert;
