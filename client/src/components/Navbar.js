import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import Container from "react-bootstrap/Container"
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import Friends from './Friends'
import Favorites from './Favorites';
import { getUser, userLogout } from '../store/user';
import { getOffices } from "../store/offices";
import { setDarkMode } from '../store/darkMode';
import { getFriends } from '../store/friends';
import { getFavorites } from '../store/favorites';

const NavigationBar = () => {

  const [checked, setChecked] = useState(false);

  const [showFriends, setShowFriends] = useState(false);
  const [showFavs, setShowFavs] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = localStorage.getItem('user')
  const offices = useSelector((state) => state.offices)

  const handleClick = (officeName) => {
    officeName = officeName.replace(/\s+/g, '_').toLowerCase();
    navigate(`/office/${officeName}`)
  }

  useEffect(()=>{
    dispatch(getUser())
    dispatch(getOffices())
  },[])

  useEffect(()=>{
    if(user) {
      dispatch(getFriends())
      dispatch(getFavorites())
    }
  },[user])

  const handleLogout = () => {
    dispatch(userLogout())
      .then(() => {
        localStorage.removeItem('user')
        return navigate("/")
      })
  }

  const darkMode = useSelector(state => state.darkMode)
  const handleChangeTheme = () => {
    dispatch(setDarkMode(!darkMode))
    localStorage.setItem('darkMode',!darkMode)
  }

  return (
    <>
    {user &&
    <Navbar expand="md">
      <Container>
        <Link to={checked ? "/" : "/profile"}>
          <ToggleButton
            id="toggle-check"
            type="checkbox"
            variant={darkMode?"outline-light":"outline-secondary"}
            checked={darkMode?false:checked}
            onClick={() => setChecked(!checked)}> <AiOutlineUser /> </ToggleButton>
        </Link>

        <NavDropdown align="center" title="Oficinas" id={darkMode?"dark-nav-dropdown":"nav-dropdown"}>
          <NavDropdown.Item onClick={() => setShowFavs(true)} >Oficinas Favoritas</NavDropdown.Item>
          <NavDropdown.Divider />
          {Object.values(offices).map((e, i) => (
          <NavDropdown.Item onClick={()=> handleClick(e.name)} key={i} >{e.name}</NavDropdown.Item>
          ))}
        </NavDropdown>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="dark-burger" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto" >
            <Nav.Link href="" >
              <ToggleButtonGroup type="checkbox">
                <ToggleButton
                  id="tbg-btn-1"
                  variant={darkMode?"light":"secondary"}
                  onClick={handleChangeTheme} >
                  {darkMode ? <MdOutlineLightMode/> : <MdOutlineDarkMode/>}
                </ToggleButton>
              </ToggleButtonGroup>
            </Nav.Link>
            <Nav.Link className={darkMode ? "dark-mode" : "light"} href="/home">Home</Nav.Link>
            <Nav.Link className={darkMode ? "dark-mode" : "light"} onClick={() => setShowFriends(true)}>Amigos</Nav.Link>
            <Nav.Link className={darkMode ? "dark-mode" : "light"} onClick={handleLogout} href="/" >Log Out</Nav.Link>
            <Nav.Link className={darkMode ? "dark-mode" : "light"} href="#link">Reportar un problema</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Friends show={showFriends} setShow={setShowFriends} />
      <Favorites show={showFavs} setShow={setShowFavs} />
    </Navbar>}
    </>
  )
}

export default NavigationBar