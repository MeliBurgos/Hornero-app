import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import { FaUserFriends, FaStar, FaPencilAlt } from "react-icons/fa"


const Profile = () => {
  return (
    <div className="text-center">
      <Image style={{ width: "60%", height: 'auto' }} roundedCircle="true" thumbnail="true" fluid="true" src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
      <Card.Body>
        <Card.Title>Nombre Apellido</Card.Title>
      </Card.Body>
      <ListGroup>
        <ListGroup.Item>Nombre@mail.com</ListGroup.Item>
        <ListGroup.Item>Oficina 1, Buenos Aires</ListGroup.Item>
        <ListGroup.Item>Algun otro dato mas</ListGroup.Item>
        <ListGroup.Item>
          <Stack gap={3}>
            <Button variant="success"> <FaUserFriends /> Amigos </Button>
            <Button variant="warning"> <FaStar /> Favoritos </Button>
          </Stack>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button variant="light"> <FaPencilAlt /> Editar </Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}


export default Profile