import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'
import { FaUserFriends, FaStar, FaPencilAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import Placeholder from 'react-bootstrap/Placeholder';

import Friends from './Friends'
import Favorites from './Favorites';

const Profile = () => {
  const [showFriends, setShowFriends] = useState(false)
  const [showFavs, setShowFavs] = useState(false)
  const darkMode = useSelector(state => state.darkMode)
  const navigate = useNavigate()
  let user = useSelector((state) => state.user)

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) navigate('/')
  }, [])

  return (
    <div className="text-center mt-3">
      <div style={{ width: "60%", aspectRatio: "1/1", maxWidth: "400px", margin: "0 auto"}}>
        <img className="profilePhoto" src={user ? user.imgUrl : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}></img>
      </div>

      <Card.Body>
        <Card.Title>{user ? `${user.name} ${user.surname}` :
          <Placeholder as="p" animation="wave">
            <Placeholder xs={8} />
          </Placeholder>
        }</Card.Title>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item>{user ? user.email :
          <Placeholder as="p" animation="wave">
            <Placeholder xs={4} />
          </Placeholder>}
        </ListGroup.Item>


        <ListGroup.Item>{user ? user.mainOffice :
          <Placeholder as="p" animation="wave">
            <Placeholder xs={4} />
          </Placeholder>}
        </ListGroup.Item>


        <ListGroup.Item>{user ? user.position :
          <Placeholder as="p" animation="wave">
            <Placeholder xs={4} />
          </Placeholder>}
        </ListGroup.Item>
      </ListGroup>

      <dt style={{ paddingTop: "5px", marginTop: "2vh" }}>
        <button style={{ maxWidth: "400px" }} onClick={() => setShowFriends(true)} className="main-button"> <FaUserFriends /> Amigos </button>
      </dt>
      <dt style={{ paddingTop: "5px" }}>
        <button style={{ maxWidth: "400px" }} onClick={() => setShowFavs(true)} className="main-button"> <FaStar /> Favoritos </button>
      </dt>
      <dt style={{ paddingTop: "5px" }}>
        <button style={{ maxWidth: "400px" }} className={darkMode ? "dark-mode-black-button" : "main-button-black"} onClick={() => navigate("/editprofile")}> <FaPencilAlt /> Editar </button>
      </dt>

      <Friends show={showFriends} setShow={setShowFriends} />
      <Favorites show={showFavs} setShow={setShowFavs} />
    </div>
  )
}


export default Profile