import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/user";
import { useEffect } from 'react'
import { getOffices } from "../store/offices";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const name = useInput();
  const surname = useInput();
  const position = useInput();
  const email = useInput();
  const password = useInput();
  const mainOffice = useInput();

  const user = JSON.parse(localStorage.getItem('user'))
  let offices = useSelector((state) => state.offices)

  useEffect(()=>{
    if(user){
      if(location.pathname === "/register"){
        navigate("/home")
      }
    }

    dispatch(getOffices())
    .then((res) => offices = res)
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      userRegister({
        name: name.value,
        surname: surname.value,
        position: position.value,
        email: email.value,
        password: password.value,
        mainOffice: mainOffice.value,
      })
    ).then(() => navigate("/"));
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
    <>
      <Card.Body>
        <Card.Title align="center">Registrarse</Card.Title>
      </Card.Body>
      <Form onSubmit={handleSubmit} align="center">
        <Form.Group className="mb-3" controlId="formBasicTextFirstName">

          <Form.Label>Nombre</Form.Label>
          <Form.Control {...name} type="text" placeholder="Ingrese su Nombre" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextLastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            {...surname}
            type="text"
            placeholder="Ingrese su Apellido"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextRol">
          <Form.Label>Rol</Form.Label>
          <Form.Select {...position} aria-label="Default select example">
            <option>Seleccione su rol</option>
            {roles.map((rol, i) => (
              <option key={i}>{rol}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextMainOffice">
          <Form.Label>Oficina Principal</Form.Label>
          <Form.Select {...mainOffice} aria-label="Default select example">
            <option>Seleccione su oficina principal</option>
            {Object.values(offices).map((e, i) => (
              <option key={i}>{e.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        {/*Object.values(offices).map((e, i) => {console.log(e.name)}*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            {...email}
            type="email"
            placeholder="Ingrese su correo electrónico"
          />
          <Form.Text className="text-muted">
            Nunca compartiremos su correo electrónico con nadie más.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            {...password}
            type="password"
            placeholder="Ingrese su contraseña"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            ¿Ya eres usuario? <Link to="/">Iniciar Sesión</Link>
          </Form.Text>
        </Form.Group>

        <button className="main-button" type="submit">
          Enviar
        </button>
      </Form>
    </>
  );
};

export default Register;
