import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Card.Body>
        <Card.Title align="center">Sign In</Card.Title>
      </Card.Body>
      <Form align="center">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            Not a member? <Link to="/register">Create Account</Link>
          </Form.Text>
        </Form.Group>

        <Button variant="success" type="submit">
          Log In
        </Button>
      </Form>
    </>
  );
};

export default Login;
