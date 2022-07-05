import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DeskSetter from "../hooks/deskSetter";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"

import MapSelector from "../images/offices/MapSelector.js"
import ReserveModal from "../commons/ReserveModal"

const Office = () => {
  const { officeName } = useParams();
  
  // regex para cambiar mar_del_plata ==> Mar Del Plata
  const officeNameOk = officeName.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) { return key.toUpperCase() });
  const [Show, setShow] = useState(false)
  const [Floor, setFloor] = useState(1)
  
  // chequea si hay alguien conectado sino te manda a login
  const navigate = useNavigate()
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('user'))) navigate('/')
  },[])

  useEffect(() => {
    DeskSetter(setShow,Floor)
  }, [Floor]);

  let officeFloors = 3 // reemplazar esto x Info traida de la db
  let items = []

  for (let i = 1; i <= officeFloors; i++) {
    items.push(
      <option key={i}>
        {i}
      </option>);
  }


  return (
    <>
      <ReserveModal show={Show} setShow={setShow} desk={`${officeNameOk}:${Show}`} />
      <div className="text-center mt-3 w-100">
        <Card.Title className="mb-3">{officeNameOk}</Card.Title>

        <div>
          <span className="d-inline-block w-25" >Piso: </span>
          <div className="d-inline-block w-25">
            <Form.Select size="sm" style={{ width: "auto" }} onChange={(e) => setFloor(e.target.value)}>
              {items}
            </Form.Select>
          </div>
        </div>

        <Card.Body>
          <div className="contsvg ratio ratio-4x3">
            <MapSelector Office={officeName} Floor={Floor} />
          </div>
        </Card.Body>

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
