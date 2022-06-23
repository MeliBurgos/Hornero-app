import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import { FaUserFriends, FaStar, FaPencilAlt } from "react-icons/fa"
import { useState } from 'react'

import Friends from '../commons/Friends'
import Favorites from '../commons/Favorites';


const Profile = () => {
  const [showFriends, setShowFriends] = useState(false)
  const [showFavs, setShowFavs] = useState(false)

  return (
    <div className="text-center">
      <Image style={{ width: "60%", height: 'auto', maxWidth: "400px" }} roundedCircle="true" thumbnail="true" fluid="true" src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
      <Card.Body>
        <Card.Title>Nombre Apellido</Card.Title>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item>Nombre@mail.com</ListGroup.Item>
        <ListGroup.Item>Oficina 1, Buenos Aires</ListGroup.Item>
        <ListGroup.Item>Algun otro dato mas</ListGroup.Item>
      <ListGroup.Item>
        <dt style={{ paddingTop:"5px" }}>
          <button style={{ maxWidth: "400px" }} onClick={()=>setShowFriends(true)} className="main-button"> <FaUserFriends /> Amigos </button>
        </dt>
        <dt style={{ paddingTop:"5px" }}>
          <button style={{ maxWidth: "400px" }} onClick={()=>setShowFavs(true)} className="main-button"> <FaStar /> Favoritos </button>
        </dt>
        <dt style={{ paddingTop:"5px" }}>
          <button style={{ maxWidth: "400px" }} className="main-button-black"> <FaPencilAlt /> Editar </button>
        </dt>
      </ListGroup.Item>
      </ListGroup>
      <Friends show={showFriends} setShow={setShowFriends} />
      <Favorites show={showFavs} setShow={setShowFavs} />
    </div>
  )
}


export default Profile