import { AiOutlineSend } from "react-icons/ai"
import { MdAddAPhoto } from "react-icons/md"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert"
import useInput from "../hooks/useInput";

import ImageModal from "./ImageModal"

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getUser, userUpdate } from "../store/user";

const EditProfile = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const darkMode = useSelector(state => state.darkMode)
  const offices = useSelector(state => state.offices)

  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const name = useInput();
  const surname = useInput();
  const email = useInput();
  const office = useInput();
  const position = useInput();
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) navigate('/')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    let nombre = name.value.length === 0 ? user.name : name.value;
    let apellido = surname.value.length === 0 ? user.surname : surname.value
    let correo = email.value.length === 0 ? user.email : email.value
    let oficina = office.value.length === 0 ? user.mainofice : office.value
    let rol = position.value.length === 0 ? user.position : position.value
    let foto = imgUrl.length === 0 ? user.imgUrl : imgUrl



    dispatch(userUpdate(
      [{
        name: nombre,
        surname: apellido,
        email: correo,
        mainOffice: oficina,
        position: rol,
        imgUrl: foto
      }, user._id]
    )).then(() => {
      setShow(true)
      window.scrollTo({ behavior: "smooth", top: 0, left: 0 })
      dispatch(getUser())
    })
      .catch(err => console.log(err))
  };

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
        <Button className={"mx-2"} onClick={() => navigate("/profile")} variant="outline-success">
          Volver a tu perfil
        </Button>
        <Button onClick={() => navigate("/")} variant="outline-success">
          Volver al Home
        </Button>
      </Alert>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div style={{ width: "60%", aspectRatio: "1/1", maxWidth: "400px", margin: "0 auto"}}>
          <img className="profilePhoto" src={imgUrl ? imgUrl : user.imgUrl}></img>
        </div>
        <div>
          <button className="main-button mt-2" type={"button"} onClick={() => setShowModal(true)}> <MdAddAPhoto /> </button>
        </div>
        <Card.Body>

          <Card.Title>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <input className={darkMode ? "dark-mode-input" : "main-input"} type="text" placeholder={user.name} onChange={name.onChange} />
              <Form.Label>Apellido</Form.Label>
              <input className={darkMode ? "dark-mode-input" : "main-input"} type="text" placeholder={user.surname} onChange={surname.onChange} />
            </Form.Group>
          </Card.Title>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item className={darkMode ? "dark-mode" : "light"}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <input className={darkMode ? "dark-mode-input" : "main-input"} type="email" placeholder={user.email} onChange={email.onChange} />
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item className={darkMode ? "dark-mode" : "light"}>
            <Form.Group className="mb-3">
              <Form.Label>Oficina principal</Form.Label>
              <select className={darkMode ? "dark-mode-input round" : "main-input round"} onChange={office.onChange}>
                <option>Open this select menu</option>
                {offices[0] && offices.map((office, i) =>
                  <option key={i} >{office.name}</option>)}
              </select>
            </Form.Group>
          </ListGroup.Item>
          <ListGroup.Item className={darkMode ? "dark-mode" : "light"}>

            <Form.Group className="mb-3" controlId="formBasicTextRol">
              <Form.Label>Rol</Form.Label>
              <select className={darkMode ? "dark-mode-input round" : "main-input round"} placeholder={user.position} onChange={position.onChange} aria-label="Default select example">
                <option>Rol</option>
                {roles.map((rol, i) => (
                  <option key={i} value={rol}>{rol}</option>
                ))}
              </select>
            </Form.Group>
          </ListGroup.Item>

          <ListGroup.Item className={darkMode ? "dark-mode" : "light"}>
            <button className="main-button" type='submit' > <AiOutlineSend /> Enviar </button>
          </ListGroup.Item>
        </ListGroup>
      </form>

      <ImageModal showModal={showModal} setShowModal={setShowModal} setImgUrl={setImgUrl} />

    </div >
  )
}




export default EditProfile