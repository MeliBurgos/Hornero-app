import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOffices } from "../store/offices";
import { getReservations } from "../store/reservations";
import { useDispatch, useSelector } from 'react-redux'
import Table from "react-bootstrap/Table";
import DeskSetter from "../hooks/deskSetter";
import MapSelector from "../images/offices/MapSelector.js"
import Calendario from "../commons/Calendario";
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import Card from "react-bootstrap/Card";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { GoWatch } from "react-icons/go"
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineCalendar } from "react-icons/ai"
import { getUserReservationsFuturas, getUserReservationsAnteriores } from "../store/reservations"


const Office = () => {
  const [Show, setShow] = useState('')
  const [Floor, setFloor] = useState(1)
  const [date, setDate] = useState("DD:MM:YYYY")
  const [hour, setHour] = useState("9:00")
  const [selectedOffice, setSelectedOffice] = useState({})
  const reservations = useSelector((state) => state.reservations)
   const offices = useSelector((state) => state.offices)
  const dispatch = useDispatch()
  let items = []
  //let userReservations = useSelector((state) => state.userReservations)
 
  const [showReservasFuturas, setShowReservasFuturas] = useState(false);
  const handleCloseF = () => setShowReservasFuturas(false);
  const handleShowF= () => setShowReservasFuturas(true);

  const [showReservasAnteriores, setShowReservasAnteriores] = useState(false);
  const handleCloseP = () => setShowReservasAnteriores(false);
  const handleShowP = () => setShowReservasAnteriores(true);

  //Nombre de la oficina y regex
  const { officeName } = useParams();
  const officeNameOk = officeName.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) { return key.toUpperCase() });
  
  // chequea si hay alguien conectado sino te manda a login
  const navigate = useNavigate()
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('user'))) navigate('/')

    dispatch(getUserReservationsFuturas()).then((res) => console.log("Futuras",res));
    dispatch(getUserReservationsAnteriores()).then((res) => console.log("Pasadas",res));
  },[])
  //Seteo fecha de hoy
  useEffect(() => {
    let newDate = new Date()
    let date = newDate.toLocaleString('en-GB').split(",")
    setDate(date[0])
    setHour(date[1].slice(0, -3))
  }, [])

  //Trae reservas de la oficina seleccionada
  /*   useEffect(() => {
      dispatch(getOffices())
        .then((res) => res.payload.forEach(oficina =>
          oficina.name.toLowerCase() === officeNameOk.toLocaleLowerCase() ? setSelectedOffice(oficina) : ""))
          .then(() => dispatch(getReservations(selectedOffice._id))
          )
    }, [officeName])
   */

  useEffect(() => {
    if (offices.length){
     setSelectedOffice(offices.find(element => element.name.toLowerCase() === officeNameOk.toLowerCase()))}
    }, [offices])


  //Cantidad de pisos por oficina
  useEffect(() => {
    if (selectedOffice.floors) {
      for (let i = 0; i <= selectedOffice.floors.length; i++) {
        items.push(
          <Dropdown.Item key={i} eventKey={i + 1}>
            {selectedOffice.floors[i]}
          </Dropdown.Item>)
      }
    }
  }, [selectedOffice])


  //Setea escritorios
  useEffect(() => {
    // pedido al back de los eventos de los escritorios
    // del piso ${Floor} en el dia ${date}${hour

    DeskSetter(Floor, setShow)
  }, [Floor]);


  //confirmacion de la reserva
  let reserveConfirmation = /*aysnc*/ () => {
    /*  try {
       const res = await dispatch( RUTADELBACK (reserve))
     } catch (error) {
       console.log(error)
     }
    */
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
        
        <Dropdown onSelect={(n) => setFloor(n)}>
          <Dropdown.Toggle id="dropdown-basic">
            Piso: {items[0] || Floor}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {items}
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
            <MapSelector Office={officeName} Floor={Floor} />
          </div>
        </Card.Body>

        <Alert variant="info" show={Show} onClose={() => setShow('')} dismissible>
          <Alert.Heading>{`Escritorio ${Show.split("D")[1]}`}</Alert.Heading>
          <p>Estado: <strong> Libre </strong>. ¡Te esperamos!
          </p>
          <hr></hr>
          <Button className={"mx-2"} onClick={() => (reserveConfirmation())} variant="outline-dark">
            Reservar
          </Button>
        </Alert>

        <Card.Text className="mt-3">
          Selecciona el espacio que quieras reservar.
        </Card.Text>


        <hr></hr>

        <button style={{ maxWidth: "400px", margin: "3%" }} onClick={handleShowF} className="main-button"><AiOutlineArrowRight /> Reservas futuras</button>

        <Modal show={showReservasFuturas} onHide={handleCloseF}>
        <Modal.Header closeButton>
          <Modal.Title>Mis Reservas</Modal.Title>
        </Modal.Header>
        <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Lugar</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
        </Table>
        <Modal.Body>aca se muestran todas las reservas</Modal.Body>
        <Modal.Footer>
          <button className="main-button" onClick={handleCloseF}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>

        <button style={{ maxWidth: "400px", margin: "3%" }} onClick={handleShowP} className="main-button"><AiOutlineArrowLeft /> Reservas anteriores</button>

        <Modal show={showReservasAnteriores} onHide={handleCloseP}>
        <Modal.Header closeButton>
          <Modal.Title>Historial</Modal.Title>
        </Modal.Header>
        <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Lugar</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
        </Table>
        <Modal.Body>aca se muestran todas las reservas</Modal.Body>
        <Modal.Footer>
          <button className="main-button" onClick={handleCloseP}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>

      </div>
    </>
  );
};

export default Office;
