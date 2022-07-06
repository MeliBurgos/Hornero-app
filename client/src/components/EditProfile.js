import { AiOutlineSend } from "react-icons/ai"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert"
import useInput from "../hooks/useInput";

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getUser, userUpdate } from "../store/user";

const EditProfile = () => {

  let Navigate = useNavigate()

  const dispatch = useDispatch()
  let user = useSelector((state) => state.user)

  const [show, setShow] = useState(false)

  const name = useInput();
  const surname = useInput();
  const email = useInput();
  const office = useInput();
  const position = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    let nombre = name.value.length === 0 ? user.name : name.value;
    let apellido = surname.value.length === 0 ? user.surname : surname.value
    let correo = email.value.length === 0 ? user.email : email.value
    let oficina = office.value.length === 0 ? user.mainofice : office.value
    let rol = position.value.length === 0 ? user.position : position.value

    dispatch(userUpdate(
      [{
        name: nombre,
        surname: apellido,
        email: correo,
        mainOffice: oficina,
        position: rol
      }, user._id]
    )).then(() => (setShow(true),
      window.scrollTo({ behavior: "smooth", top: 0, left: 0 })))
      .catch(err => console.log(err))
  };

  const mainOffice = [
    "La Plata",
    "Tandil",
    "Mar del Plata",
    "Bahía Blanca",
    "Rosario",
    "Córdoba",
    "Mendoza",
    "Tucumán",
    "Resistencia",
  ];

   const roles = [
    "Development and Coding",
    "Project Management",
    "Project Design",
    "Marketing and Communication",
    "Human Resources",
    "Financial Management"
  ]

  return (
    <div className="text-center mt-3">

      <Alert variant="success" show={show} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>¡Éxito!</Alert.Heading>
        <p>
          Tus datos se actualizaron <strong>correctamente</strong>
        </p>
        <hr></hr>
        <Button className={"mx-2"} onClick={() => Navigate("/profile")} variant="outline-success">
          Volver a tu perfil
        </Button>
        <Button onClick={() => Navigate("/")} variant="outline-success">
          Volver al Home
        </Button>
      </Alert>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Image style={{ width: "60%", height: 'auto' }} roundedCircle="true" thumbnail="true" src={user.photo} />
        <Card.Body>

          <Card.Title>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder={user.name} onChange={name.onChange} />
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder={user.surname} onChange={surname.onChange} />
            </Form.Group>
          </Card.Title>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder={user.email} onChange={email.onChange} />
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Group className="mb-3">
              <Form.Label>Oficina principal</Form.Label>
              <Form.Select onChange={office.onChange}>
                <option>Open this select menu</option>
                {mainOffice.map((office, i) =>
                  <option key={i} >{office}</option>)}
              </Form.Select>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item>

<Form.Group className="mb-3" controlId="formBasicTextRol">
          <Form.Label>Rol</Form.Label>
          <Form.Select placeholder={user.position} onChange={position.onChange} aria-label="Default select example">
            <option>Rol</option>
            {roles.map((rol, i) => (
              <option key={i} value={rol}>{rol}</option>
            ))}
          </Form.Select>
        </Form.Group>

          </ListGroup.Item>

          <ListGroup.Item>
            <Button variant="light" type='submit' > <AiOutlineSend /> Enviar </Button>
          </ListGroup.Item>
        </ListGroup>
      </form>


    </div >
  )
}




export default EditProfile