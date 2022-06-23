import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import { FaUserFriends, FaStar, FaPencilAlt } from "react-icons/fa"
import {useNavigate} from "react-router-dom"


const Profile = ({user}) => {

  let Navigate = useNavigate()

  return (
    <div className="text-center mt-3">
      <Image  style={{ width: "60%", height: 'auto' }} roundedCircle="true" thumbnail="true" src={user.photo} />
      <Card.Body>
        <Card.Title>{user.name} {user.surname}</Card.Title>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item>{user.email}</ListGroup.Item>
        <ListGroup.Item>{user.mainofice}</ListGroup.Item>
        <ListGroup.Item>{user.charge}</ListGroup.Item>
        <ListGroup.Item>
          <Stack gap={3}>
            <Button variant="success"> <FaUserFriends /> Amigos </Button> 
            <Button variant="warning" > <FaStar /> Favoritos </Button>
          </Stack>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button variant="light" onClick={()=>Navigate("/editprofile")} > <FaPencilAlt /> Editar </Button>
        </ListGroup.Item>
      </ListGroup>


    </div>
  )
}


export default Profile