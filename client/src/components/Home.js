import Logo from "../images/Globant-Original.svg"
import Image from "react-bootstrap/Image"
import ListGroup from 'react-bootstrap/ListGroup';
import { AiOutlineSearch, AiOutlineEdit } from "react-icons/ai"
import { MdOutlineWorkOutline } from "react-icons/md"
import { FaRegShareSquare } from "react-icons/fa"
import { getUser } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'

const Home = () => {
  const dispatch = useDispatch()
  let user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUser())
      .then((res) => user = res)
  }, [])

  return (
    <div className="text-center mt-3" style={{}}>
      <h5>Hola {user.name} !</h5>
      <h1>Bienvenido a Hornero</h1>
      <h5 class="d-flex align-items-center justify-content-center">una app de  <Image src={Logo} alt='Globant' style={{ width: "30%" }} ></Image></h5>
      <hr></hr>
      <div style={{ height: "50vh", width: "100vw", display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: 'center' }}>

        <div style={{ width: "20%" }}> <strong>Buscá</strong> </div>
        <div style={{ width: "20%" }}> <AiOutlineSearch /> </div>
        <hr class="w-100"></hr>
        <div style={{ width: "20%" }}> <strong>Reservá</strong> </div>
        <div style={{ width: "20%" }}> <AiOutlineEdit /> </div>
        <hr class="w-100"></hr>
        <div style={{ width: "20%" }}> <strong>Compartí</strong> </div>
        <div style={{ width: "20%" }}> <FaRegShareSquare /> </div>
        <hr class="w-100"></hr>
        <div style={{ width: "20%" }}> <strong>Trabajá</strong> </div>
        <div style={{ width: "20%" }}> <MdOutlineWorkOutline /> </div>
        <hr class="w-100"></hr>
        <h5>Todo en la palma de tu mano</h5>


        {/*  <ListGroup variant="flush"> 
          <ListGroup.Item> <strong>Buscá</strong> <AiOutlineSearch className="mx-2" />  </ListGroup.Item>
          <ListGroup.Item> <strong>Reservá</strong> <AiOutlineEdit className="mx-2" /> </ListGroup.Item>
          <ListGroup.Item> <strong>Compartí</strong> <FaRegShareSquare className="mx-2" /> </ListGroup.Item>
          <ListGroup.Item> <strong>Trabajá </strong> <MdOutlineWorkOutline className="mx-2" /> </ListGroup.Item>
          <ListGroup.Item> <h5>Todo en la palma de tu mano</h5> </ListGroup.Item>
        </ListGroup> */}
      </div>
    </div>


  );
};

export default Home;
