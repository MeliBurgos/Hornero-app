import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { userRegister } from "../store/user";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useInput();
  const surname = useInput();
  const position = useInput();
  const email = useInput();
  const password = useInput();
  const mainOffice = useInput();
  console.log("MAIN OFFICE", mainOffice.value)

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
    ).then(() => navigate("/login"));
  };

  const mainOffices = [
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
          <Form.Control {...surname} type="text" placeholder="Ingrese su Apellido" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextCharge">
          <Form.Label>Cargo</Form.Label>
          <Form.Control {...position} type="text" placeholder="Ingrese su Cargo" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextMainOffice">
          <Form.Label>Oficina Principal</Form.Label>
          <Form.Select {...mainOffice} aria-label="Default select example">
          <option>Seleccione su oficina principal</option>
          {mainOffices.map((office, i) =>
            <option key={i}>{office}</option>
          )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control {...email} type="email" placeholder="Ingrese su correo electrónico" />
          <Form.Text className="text-muted">
            Nunca compartiremos su correo electrónico con nadie más.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control {...password} type="password" placeholder="Ingrese su contraseña" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            ¿Ya eres usuario? <Link to="/login">Iniciar Sesión</Link>
          </Form.Text>
        </Form.Group>

        <Button variant="success" type="submit">
          Enviar
        </Button>
      </Form>
    </>
  );
};

export default Register;
