import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/user';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useInput();
  const password = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    dispatch(userLogin({
      email: email.value,
      password: password.value,
    }))
      .then(() => navigate("/"))
  }

  return (
    <>
      <Card.Body>
        <Card.Title align="center">Iniciar sesión</Card.Title>
      </Card.Body>
      <Form onSubmit={handleSubmit} align="center">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control {...email} type="email" placeholder="Ingrese su correo electrónico" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control {...password} type="password" placeholder="Ingrese su contraseña" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            ¿No es un miembro?<Link to="/register">Crear una cuenta</Link>
          </Form.Text>
        </Form.Group>

        <button className="main-button" type="submit">
          Iniciar sesión
        </button>
      </Form>
    </>
  );
};

export default Login;
