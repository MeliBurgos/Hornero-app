import Logo from "../images/Globant-Original.svg"
import LogoWhite from "../images/Globant-White-Green.svg"
import Image from "react-bootstrap/Image"
import ListGroup from 'react-bootstrap/ListGroup';
import { AiOutlineSearch, AiOutlineEdit } from "react-icons/ai"
import { MdOutlineWorkOutline } from "react-icons/md"
import { FaRegShareSquare } from "react-icons/fa"
import { useSelector } from "react-redux";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.user)
  const darkMode = useSelector(state => state.darkMode)
  const navigate = useNavigate()

  // si no hay nadie conectado te manda al login
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('user'))) navigate('/')
  },[])

  return (
    <div className="text-center mt-3" style={{ height: "75vh" }}>
      <h5>Hola {user.name} !</h5>
      <h1>Bienvenido a Hornero</h1>
      <h5 class="d-flex align-items-center justify-content-center">una app de  <Image src={darkMode? LogoWhite: Logo} alt='Globant' style={{ width: "30%" }} ></Image></h5>
      <hr></hr>
      <div>
        <ListGroup  variant="flush"   >
          <ListGroup.Item className={darkMode ? "dark-mode" : "light"} > <strong>Buscá</strong> <AiOutlineSearch className="mx-2" />  </ListGroup.Item>
          <ListGroup.Item className={darkMode ? "dark-mode" : "light"} > <strong>Reservá</strong> <AiOutlineEdit className="mx-2" /> </ListGroup.Item>
          <ListGroup.Item className={darkMode ? "dark-mode" : "light"} > <strong>Compartí</strong> <FaRegShareSquare className="mx-2" /> </ListGroup.Item>
          <ListGroup.Item className={darkMode ? "dark-mode" : "light"} > <strong>Trabajá </strong> <MdOutlineWorkOutline className="mx-2" /> </ListGroup.Item>
          <ListGroup.Item className={darkMode ? "dark-mode" : "light"} > <h5>Todo en la palma de tu mano</h5> </ListGroup.Item>
        </ListGroup>
      </div>
    </div>


  );
};

export default Home;
