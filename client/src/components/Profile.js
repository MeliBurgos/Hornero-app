import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import { FaUserFriends, FaStar, FaPencilAlt } from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import Friends from './Friends'
import Favorites from './Favorites';

const Profile = () => {
  const [showFriends, setShowFriends] = useState(false)
  const [showFavs, setShowFavs] = useState(false)
  const darkMode = useSelector(state => state.darkMode)

  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('user'))) navigate('/')
  },[])


  return (
    <div className="text-center mt-3">
      <Image  style={{ width: "60%", height: 'auto', maxWidth: "400px" }} roundedCircle="true" thumbnail="true" src={user.imgUrl} />

      <Card.Body>
        <Card.Title>{user.name} {user.surname}</Card.Title>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item className={darkMode? "dark-mode": "light"}>{user.email}</ListGroup.Item>
        <ListGroup.Item className={darkMode? "dark-mode": "light"}>{user.mainOffice}</ListGroup.Item>
        <ListGroup.Item className={darkMode? "dark-mode": "light"}>{user.position}</ListGroup.Item>
      <ListGroup.Item className={darkMode? "dark-mode": "light"}>
        <dt style={{ paddingTop:"5px" }}>
          <button style={{ maxWidth: "400px" }} onClick={()=>setShowFriends(true)} className="main-button"> <FaUserFriends /> Amigos </button>
        </dt>
        <dt style={{ paddingTop:"5px" }}>
          <button style={{ maxWidth: "400px" }} onClick={()=>setShowFavs(true)} className="main-button"> <FaStar /> Favoritos </button>
        </dt>
        <dt style={{ paddingTop:"5px" }}>
          <button style={{ maxWidth: "400px" }} className={darkMode?"dark-mode-black-button":"main-button-black"} onClick={()=>navigate("/editprofile")}> <FaPencilAlt /> Editar </button>
        </dt>
      </ListGroup.Item>
      </ListGroup>
      <Friends show={showFriends} setShow={setShowFriends} />
      <Favorites show={showFavs} setShow={setShowFavs} />
    </div>
  )
}


export default Profile