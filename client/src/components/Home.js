import Logo from "../images/Globant-Original.svg"
import LogoWhite from "../images/Globant-White-Green.svg"
import Image from "react-bootstrap/Image"
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
    <div className="text-center mt-3">
      {user && <h5>Hola {user.name} !</h5>}
      <h1>Bienvenido a Hornero</h1>
      <h5 className="d-flex align-items-center justify-content-center">una app de  <Image src={darkMode? LogoWhite: Logo} alt='Globant' style={{ width: "30%", maxWidth:"200px" }} ></Image></h5>
      <hr></hr>
      <div style={{ height: "50vh", width: "100vw", display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: 'center' }}>

        <div style={{ width: "75px" }}> <strong>Buscá</strong> </div>
        <div style={{ width: "75px" }}> <AiOutlineSearch /> </div>
        <hr class="w-100"></hr>
        <div style={{ width: "75px" }}> <strong>Reservá</strong> </div>
        <div style={{ width: "75px" }}> <AiOutlineEdit /> </div>
        <hr class="w-100"></hr>
        <div style={{ width: "75px" }}> <strong>Compartí</strong> </div>
        <div style={{ width: "75px" }}> <FaRegShareSquare /> </div>
        <hr class="w-100"></hr>
        <div style={{ width: "75px" }}> <strong>Trabajá</strong> </div>
        <div style={{ width: "75px" }}> <MdOutlineWorkOutline /> </div>
        <hr class="w-100"></hr>
        <h5>Todo en la palma de tu mano</h5>
      </div>
    </div>


  );
};

export default Home;
