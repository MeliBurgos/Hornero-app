import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DeskSetter from "../hooks/deskSetter";
import MapSelector from "../images/offices/MapSelector.js"
import Calendario from "../commons/Calendario";

import Dropdown from 'react-bootstrap/Dropdown';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { GoWatch } from "react-icons/go"
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineCalendar } from "react-icons/ai"


const Office = () => {

  const [Show, setShow] = useState('')
  const [Floor, setFloor] = useState(1)
  const [date, setDate] = useState("DD:MM:YYYY")
  const [hour, setHour] = useState("9:00")

  //Nombre de la oficina y regex
  const { officeName } = useParams();

  const officeNameOk = officeName.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) { return key.toUpperCase() });

  //Seteo fecha de hoy
  useEffect(() => {
    let newDate = new Date()
    let date = newDate.toLocaleString('en-GB').split(",")
    setDate(date[0])
    setHour(date[1].slice(0, -3))
  }, [])

  //Setea escritorios
  useEffect(() => {
    // pedido al back de los eventos de los escritorios
    // del piso ${Floor} en el dia ${date}${hour

    DeskSetter(Floor, setShow)
  }, [Floor]);


  //Cantidad de pisos por oficina
  let officeFloors = 3 // reemplazar esto x Info traida de la db
  let items = []

  for (let i = 1; i <= officeFloors; i++) {
    items.push(
      <Dropdown.Item eventKey={i}>
        {i}
      </Dropdown.Item>
    );
  }

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

        <Dropdown onSelect={(n)=>setFloor(n)}>
          <Dropdown.Toggle id="dropdown-basic">
            Piso: {Floor}
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
          <div class="contsvg ratio ratio-4x3">
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


        <button style={{ maxWidth: "400px" }} onClick={() => console.log("Muestra las reservas futuras")} className="main-button"><AiOutlineArrowRight /> Reservas agendadas</button>

        <button style={{ maxWidth: "400px", margin: "3%" }} onClick={() => console.log("Muestra las reservas pasadas")} className="main-button"><AiOutlineArrowLeft /> Reservas anteriores</button>
      </div>
    </>
  );
};

export default Office;
