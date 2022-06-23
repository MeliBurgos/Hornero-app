import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import { FaUserFriends, FaStar, FaPencilAlt } from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import { useState } from 'react'

import Friends from '../commons/Friends'
import Favorites from '../commons/Favorites';

const Profile = ({user}) => {

  let Navigate = useNavigate()

  return (
    <div className="text-center mt-3">
      <Image  style={{ width: "60%", height: 'auto', maxWidth: "400px" }} roundedCircle="true" thumbnail="true" src={user.photo} />

      <Card.Body>
        <Card.Title>{user.name} {user.surname}</Card.Title>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item>{user.email}</ListGroup.Item>
        <ListGroup.Item>{user.mainofice}</ListGroup.Item>
        <ListGroup.Item>{user.charge}</ListGroup.Item>
      <ListGroup.Item>
        <dt style={{ paddingTop:"5px" }}>
          <button style={{ maxWidth: "400px" }} onClick={()=>setShowFriends(true)} className="main-button"> <FaUserFriends /> Amigos </button>
        </dt>
        <dt style={{ paddingTop:"5px" }}>
          <button style={{ maxWidth: "400px" }} onClick={()=>setShowFavs(true)} className="main-button"> <FaStar /> Favoritos </button>
        </dt>
        <dt style={{ paddingTop:"5px" }}>
          <button style={{ maxWidth: "400px" }} className="main-button-black" onClick={()=>Navigate("/editprofile")}> <FaPencilAlt /> Editar </button>
        </dt>
      </ListGroup.Item>
      </ListGroup>
      <Friends show={showFriends} setShow={setShowFriends} />
      <Favorites show={showFavs} setShow={setShowFavs} />
    </div>
  )
}


export default Profile