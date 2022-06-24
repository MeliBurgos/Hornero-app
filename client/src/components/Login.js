import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Card.Body>
        <Card.Title align="center">Iniciar sesión</Card.Title>
      </Card.Body>
      <Form align="center">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingrese su correo electrónico" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingrese su contraseña" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            ¿No es un miembro?<Link to="/register">Crear una cuenta</Link>
          </Form.Text>
        </Form.Group>

        <Button variant="success" type="submit">
          Iniciar sesión
        </Button>
      </Form>
    </>
  );
};

export default Login;
