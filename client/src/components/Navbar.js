import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container"
import logoSmall from '../images/Short-Original.svg'
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from 'react'

import Friends from '../commons/Friends'
import Favorites from '../commons/Favorites';

const NavigationBar = () => {
  const [showFriends, setShowFriends] = useState(false);
  const [showFavs, setShowFavs] = useState(false);

  return (
    <Navbar collapseOnSelect bg="light" expand="md">
      <Container>
        <Link to='/'>
          <img src={logoSmall} className="navLogo" alt="logo-globant" />
        </Link>
        <Link to="/profile">
        <Button variant="outline-secondary"> <AiOutlineUser /> </Button>
        </Link>

        <NavDropdown align="center" title="Oficinas" id="basic-nav-dropdown">
          <NavDropdown.Item  >Oficina 1 piso 2</NavDropdown.Item>
          <NavDropdown.Item  >Oficina 1 piso 3</NavDropdown.Item>
          <NavDropdown.Item  >Oficina 2</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={()=>setShowFavs(true)} >Oficinas Favoritas</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link onClick={()=>setShowFriends(true)}>Amigos</Nav.Link>
            <Nav.Link href="#link">Reportar un problema</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Friends show={showFriends} setShow={setShowFriends} />
      <Favorites show={showFavs} setShow={setShowFavs} />
    </Navbar>
  )
}

export default NavigationBar