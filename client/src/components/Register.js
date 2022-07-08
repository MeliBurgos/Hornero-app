import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/user";
import { useEffect, useState } from "react";
import { getOffices } from "../store/offices";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const name = useInput();
  const surname = useInput();
  const email = useInput();
  const password = useInput();
  const [position, setPosition] = useState("");
  const [mainOffice, setMainOffice] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  let offices = useSelector((state) => state.offices);

  useEffect(() => {
    if (user) {
      if (location.pathname === "/register") {
        navigate("/home");
      }
    }
    dispatch(getOffices()).then((res) => (offices = res));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      userRegister({
        name: name.value,
        surname: surname.value,
        email: email.value,
        password: password.value,
        position: position,
        mainOffice: mainOffice,
      })
    ).then(() => navigate("/"));
  };

  const roles = [
    "Development and Coding",
    "Project Management",
    "Project Design",
    "Marketing and Communication",
    "Human Resources",
    "Financial Management",
  ];
  return (
    <>
      <Card.Body>
        <Card.Title align="center">Registrarse</Card.Title>
      </Card.Body>
      <Form onSubmit={handleSubmit} align="center">
        <Form.Group className="mb-3" controlId="formBasicTextFirstName">
          <Form.Label>Nombre</Form.Label>
          <br></br>
          <input
            className="input-form"
            {...name}
            type="text"
            placeholder="Ingrese su Nombre"
            required
            minLength="4"
            maxLength="20"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextLastName">
          <Form.Label>Apellido</Form.Label>
          <br></br>
          <input
            className="input-form"
            {...surname}
            type="text"
            placeholder="Ingrese su Apellido"
            required
            minLength="4"
            maxLength="30"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextRol">
          <Form.Label>Rol</Form.Label>
          <br></br>
          <select
            className="select-form"
            required
            onChange={(e) => setPosition(e.target.value)}
          >
            <option>Seleccione su rol</option>
            {roles.map((rol, i) => (
              <option key={i} value={rol}>
                {rol}
              </option>
            ))}
          </select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextMainOffice">
          <Form.Label>Oficina Principal</Form.Label>
          <br></br>
          <select
            className="select-form"
            required
            onChange={(e) => setMainOffice(e.target.value)}
          >
            <option>Seleccione su oficina principal</option>
            {Object.values(offices).map((e, i) => (
              <option key={i}>{e.name}</option>
            ))}
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <br></br>
          <input
            className="input-form"
            {...email}
            type="email"
            placeholder="Ingrese su correo electrónico"
            required
          />
          <Form.Text className="text-muted">
            <br></br>
            Nunca compartiremos su correo electrónico con nadie más.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <br></br>
          <input
            className="input-form"
            {...password}
            type="password"
            placeholder="Ingrese su contraseña"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            ¿Ya eres usuario? <Link to="/">&nbsp;Iniciar Sesión</Link>
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
