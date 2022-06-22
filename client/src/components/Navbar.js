import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/button'
import Container from "react-bootstrap/Container"

import { AiOutlineUser } from "react-icons/ai"
/* import { Link } from "react-router-dom";
 */


const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="md">
      <Container>

        {/*<Link to="/profile">*/}
        <Button variant="outline-secondary"> <AiOutlineUser /> </Button>
        {/*</Link> */}

        <NavDropdown align="center" title="Oficinas" id="basic-nav-dropdown">
          <NavDropdown.Item  >Oficina 1 piso 2</NavDropdown.Item>
          <NavDropdown.Item  >Oficina 1 piso 3</NavDropdown.Item>
          <NavDropdown.Item  >Oficina 2</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item  >Oficinas Favoritas</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Amigos</Nav.Link>
            <Nav.Link href="#link">Reportar un problema</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar