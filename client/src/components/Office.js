import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { selectedFloor } from "../store/selectedFloor";
import { addFavorite, getFavorites, removeFavorite } from "../store/favorites";
import { getReservations, newReservation } from "../store/reservations";
import Table from "react-bootstrap/Table";
import DeskSetter from "../hooks/deskSetter";
import Calendario from "../commons/Calendario";
import MapSelector from "../images/offices/MapSelector.js"
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import Card from "react-bootstrap/Card";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { GoWatch } from "react-icons/go";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Popover from 'react-bootstrap/Popover';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineCalendar } from "react-icons/ai"
import { getUserReservationsFuturas, getUserReservationsAnteriores } from "../store/userReservations"

const Office = () => {
  const reduxFloor = useSelector((state) => state.selectedFloor)

  const [Show, setShow] = useState('')
  const [Floor, setFloor] = useState(reduxFloor ? reduxFloor.split("F")[1].split("D")[0] : 2)
  const [hour, setHour] = useState("9:00")
  const [date, setDate] = useState("DD:MM:YYYY")
  const [addedToFavorites, setAddedToFavorites] = useState(false)
  const [selectedOffice, setSelectedOffice] = useState({ floors: [] })
 

  const user = useSelector((state) => state.user)
  const offices = useSelector((state) => state.offices)
  const favorites = useSelector(state => state.favorites)
  const reservations = useSelector((state) => state.reservations)
 
 const dispatch = useDispatch()
  let items = []
  let userReservations = useSelector((state) => state.userReservations)
 
  const [showReservas, setShowReservas] = useState(false);

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
    let date = newDate.toLocaleString('en-GB').split(",")
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
    }
  }, [officeNameOk])


  //Setea escritorios
  useEffect(() => {

    let dayReserv = []
    if (reservations) {
      reservations.forEach((reserva) => reserva.start.includes(date) ? dayReserv.push(reserva) : null)

      DeskSetter(Floor, dayReserv, officeNameOk, favorites, setShow)
    }
  }, [Floor, date, reservations]);


  const handleFloorSelector = (n) => {
    dispatch(selectedFloor(`${officeName}F${n}`))
    setFloor(Number(n))
  }

  //Manejo de Favoritos
  useEffect(() => {
    if (favorites[0]) {
      if (favorites.includes(Show.desk)) setAddedToFavorites(true)
      else setAddedToFavorites(false)
    }
  }, [Show])

  const handleRemoveFromFavorites = async (desk) => {
    await dispatch(removeFavorite(`${officeNameOk}:${desk}`))
    dispatch(getFavorites())
    setAddedToFavorites(false)
  }

  const handleAddToFavorites = async (desk) => {
    await dispatch(addFavorite(`${officeNameOk}:${desk}`))
    dispatch(getFavorites())
    setAddedToFavorites(true)
  }

  //confirmacion de la reserva
  const reserveConfirmation = async () => {
    try {
      await dispatch(newReservation({
        start: `${date}T${hour}`,
        user: user._id,
        booking: Show.desk,
        office: selectedOffice._id
      }))
      await dispatch(getReservations(selectedOffice._id))
    } catch (error) {
      console.log(error)
    }

  }

  const handleShowFuturas = () => {
    dispatch(getUserReservationsFuturas())
    .then(()=>setShowReservas('futuras'))
  }
  const handleShowPasadas = () => {
    dispatch(getUserReservationsAnteriores())
    .then(() => setShowReservas('anteriores'))
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
        <TimePicker showSecond={false} onChange={(value) => setHour(value.format("HH:mm"))} disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23]} placeholder={"HH:MM"} minuteStep={15} allowEmpty={false} />
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div className="text-center mt-3 w-100">
        <Card.Title className="mb-3">{officeNameOk}</Card.Title>

        <Dropdown onSelect={(n) => handleFloorSelector(n)}>
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
          <button style={{ maxWidth: "45%", margin: "2%" }} className="main-button">Hora: <GoWatch /> {hour}</button>
        </OverlayTrigger>

        <Card.Body>
          <div className="contsvg ratio ratio-4x3">
            <MapSelector />
          </div>
        </Card.Body>

        <Alert variant="info" show={Show} onClose={() => setShow('')} dismissible>
          {Show.desk && <Alert.Heading>{`Escritorio ${Show.desk.split("D")[1]}`}</Alert.Heading>}
          {Show.reserve ? <><p> Ocupado por  <strong> {Show.reserve.user.name} {Show.reserve.user.surname} </strong> </p>
            <span>Desde: <strong>{Show.reserve.start.slice(-5)} hs</strong></span>
            {" | "}
            <span>Hasta: <strong>{Show.reserve.end} hs</strong></span></>

            :

            <><p> Este escritorio está <strong>libre</strong>.</p> <p>¡Hace tu reserva!</p></>}

          <hr></hr>

          {addedToFavorites ? <Button className={"mx-2 ml-10"} onClick={() => handleRemoveFromFavorites(Show.desk)} variant="outline-warning">
            <BsDashCircle size={20} /> Favorito
          </Button> :
            <Button className={"mx-2 ml-10"} onClick={() => handleAddToFavorites(Show.desk)} variant="outline-warning">
              <BsPlusCircle size={20} /> Favorito
            </Button>}

          {!Show.reserve && <Button className={"mx-2"} onClick={() => (reserveConfirmation())} variant="outline-secondary">
            Reservar
          </Button>}


        </Alert>

        <Card.Text className="mt-3">
          Selecciona el espacio que quieras reservar.
        </Card.Text>

        <hr></hr>

        <button style={{ maxWidth: "400px", margin: "3%" }} onClick={handleShowFuturas} className="main-button"><AiOutlineArrowRight /> Reservas futuras</button>
        <button style={{ maxWidth: "400px", margin: "3%" }} onClick={handleShowPasadas} className="main-button"><AiOutlineArrowLeft /> Reservas anteriores</button>

        <Modal show={showReservas} onHide={() => setShowReservas(false)} centered>
        <Modal.Header>
          <Modal.Title>{showReservas === 'anteriores' ? 'Reservas Pasadas' : 'Reservas Futuras'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Lugar</th>
              </tr>
            </thead>
            <tbody>
              {userReservations.map((reserva,i)=>{
                return (<tr key={i} onClick={()=>{setDate(reserva.start.split('T')[0]);setShowReservas(false)}}>
                  <td>{`${reserva.start.split('T')[0]} ${reserva.start.split('T')[1]}hs`}</td>
                  <td>{reserva.booking}</td>
                  </tr>)
              })}
            </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
          <button className="main-button" onClick={() => setShowReservas(false)}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>

      </div>
    </>
  );
};

export default Office;
