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

  const firstName = useInput();
  const lastName = useInput();
  const charge = useInput();
  const email = useInput();
  const password = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      userRegister({
        firstName: firstName.value,
        lastName: lastName.value,
        charge: charge.value,
        email: email.value,
        password: password.value,
      })
    ).then(() => navigate("/login"));
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

  return (
    <>
      <Card.Body>
        <Card.Title align="center">Sign Up</Card.Title>
      </Card.Body>
      <Form onSubmit={handleSubmit} align="center">
        <Form.Group className="mb-3" controlId="formBasicTextFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control {...firstName} type="text" placeholder="First Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control {...lastName} type="text" placeholder="Last Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextCharge">
          <Form.Label>Charge</Form.Label>
          <Form.Control {...charge} type="text" placeholder="Charge" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextMainOffice">
          <Form.Label>Main Office</Form.Label>
          <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          {mainOffice.map((office, i) =>
            <option value={i}>{office}</option>
          )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control {...email} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Text className="text-muted">
            Already a member? <Link to="/login">Log In</Link>
          </Form.Text>
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;
