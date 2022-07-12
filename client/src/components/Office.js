import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Popover from 'react-bootstrap/Popover';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { GoWatch } from "react-icons/go";
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineCalendar } from "react-icons/ai"

import { getUserReservationsFuturas, getUserReservationsAnteriores } from "../store/userReservations"
import { selectedFloor } from "../store/selectedFloor";
import { getReservations, cancelReservation } from "../store/reservations";
import MapSelector from "../images/offices/MapSelector.js";
import DeskSetter from "../hooks/deskSetter";
import Calendario from "../commons/Calendario";
import ReserveAlert from "./ReserveAlert"
import FuturePastModal from "./FuturePastModal";

const Office = () => {
  const dispatch = useDispatch()
  const reduxFloor = useSelector((state) => state.selectedFloor)
  const offices = useSelector((state) => state.offices)
  const favorites = useSelector(state => state.favorites)
  const reservations = useSelector((state) => state.reservations)
  const darkMode = useSelector((state) => state.darkMode)
  
  const [Show, setShow] = useState('')
  const [hour, setHour] = useState("9:00")
  const [date, setDate] = useState("DD:MM:YYYY")
  const [selectedOffice, setSelectedOffice] = useState({ floors: [] })
  const [Floor, setFloor] = useState(reduxFloor ? reduxFloor.split("F")[1].split("D")[0] : 2)
  const [showReservas, setShowReservas] = useState(false);
  
  let items = []
 
  const businessHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23]

  //Nombre de la oficina y regex
  const { officeName } = useParams();
  const officeNameOk = officeName.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) { return key.toUpperCase() });

  // chequea si hay alguien conectado sino te manda a login
  const navigate = useNavigate()
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('user'))) navigate('/') 
  },[])
  
  //Seteo fecha de hoy
  useEffect(() => {
    let newDate = new Date()
    let date = newDate.toLocaleString('en-GB').split(", ")
    setDate(date[0].replace(/\//g, '-'))
    setHour(date[1].slice(0, -3))
  }, [])

  //Trae reservas de la oficina seleccionada
  useEffect(() => {
    if (selectedOffice._id) {
      dispatch(getReservations(selectedOffice._id))
      setFloor(reduxFloor ? reduxFloor.split("F")[1].split("D")[0] : selectedOffice.floors[0])
    }
  }, [offices, selectedOffice])
  
  //Setea la oficina seleccionada
  useEffect(() => {
    if (offices.length) {
      setSelectedOffice(offices.find(element => element.name.toLowerCase() === officeNameOk.toLowerCase()))
      setShow('')
      window.scrollTo({ behavior: "smooth", top: 0, left: 0 })
    }
  }, [officeNameOk])
  
  //Setea escritorios
  useEffect(() => {
    let dayReserv = []
    if (reservations) {
      reservations.forEach((reserva) => reserva.start.includes(date) ? dayReserv.push(reserva) : null)
      
      DeskSetter(Floor, dayReserv, officeNameOk, favorites, setShow)
      setShow('')
    }
  }, [Floor, date, reservations, darkMode]);
  
  // setea el piso seleccionado
  const handleFloorSelector = (n, name) => {
    dispatch(selectedFloor(`${name}F${n}`))
    setFloor(Number(n))
    navigate(`/office/${name}`)
  }
    
  // cancelar reserva
  const handleCancelReserve = async (reserveId) =>{
    try {
      await dispatch(cancelReservation(reserveId))
      await dispatch(getReservations(selectedOffice._id))
      setShow('')
    } catch (error) {
      console.log(error)
    }
  }
  // abre modal de reservas futuras
  const handleShowFuturas = async () => {
    try {
      await dispatch(getUserReservationsFuturas())
      setShowReservas('futuras')
    } catch (error) {
      console.log(error)
    }
  }
  // abre modal de reservas pasadas
  const handleShowPasadas = async () => {
    try {
      await dispatch(getUserReservationsAnteriores())
      setShowReservas('anteriores')
    } catch (error) {
      console.log(error)
    }
  }

  //Popovers date y time picker
  const popoverDate = (
    <Popover id="popover-basic" style={{ width: "90%" }}>
      <Popover.Header as="h3" >Seleccione dia</Popover.Header>
      <Popover.Body >
        <Calendario setDate={setDate} />
      </Popover.Body>
    </Popover>
  );

  const popoverHour = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" >Seleccione Hora</Popover.Header>
      <Popover.Body >
        <TimePicker showSecond={false} onChange={(value) => setHour(value.format("HH:mm"))} disabledHours={() => businessHours} placeholder={"HH:MM"} minuteStep={15} allowEmpty={false} />
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div className="text-center mt-3 w-100">
        <Card.Title className="mb-3">{officeNameOk}</Card.Title>

        <Dropdown onSelect={(n) => handleFloorSelector(n, officeName)}>
          <Dropdown.Toggle id="dropdown-basic">
            Piso: {items[0] || Floor}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {selectedOffice.floors && selectedOffice.floors.map((floor, i) =>
              <Dropdown.Item key={i} eventKey={floor}>
                {floor}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <OverlayTrigger rootClose={true} trigger="click" placement="bottom-end" overlay={popoverDate}>
          <button style={{ maxWidth: "50%", margin: "2%" }} className="main-button"> Fecha: <AiOutlineCalendar /> {date}</button>
        </OverlayTrigger>

        <OverlayTrigger rootClose={false} trigger="click" placement="bottom-end" overlay={popoverHour}>
          <button style={{ maxWidth: "45%", margin: "2%" }} className="main-button">Hora: <GoWatch />{hour}</button>
        </OverlayTrigger>

        <Card.Body>
          <div className="contsvg ratio ratio-4x3">
            <MapSelector />
          </div>
        </Card.Body>

        {Show ? <ReserveAlert 
          Show={Show}
          setShow={setShow}
          officeNameOk={officeNameOk}
          handleCancelReserve={handleCancelReserve}
          officeId={selectedOffice._id}
          date={date}
          hour={hour}
        />
        :
        <><Card.Text className="mt-3">
          Selecciona el espacio que quieras reservar.
        </Card.Text><hr/></>}

        <button style={{ maxWidth: "400px", margin: "3%" }} onClick={handleShowFuturas} className="main-button"><AiOutlineArrowRight /> Reservas futuras</button>
        <button style={{ maxWidth: "400px", margin: "3%" }} onClick={handleShowPasadas} className="main-button"><AiOutlineArrowLeft /> Reservas pasadas</button>

        <FuturePastModal
          showReservas={showReservas}
          setShowReservas={setShowReservas}
          setDate={setDate}
          officeNameOk={officeNameOk}
          handleFloorSelector={handleFloorSelector}
          handleCancelReserve={handleCancelReserve}
        />

      </div>
    </>
  );
};

export default Office;
