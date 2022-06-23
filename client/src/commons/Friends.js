import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BsFillTrashFill, BsFillChatTextFill, BsPlusCircle } from "react-icons/bs";
import { useEffect, useState } from "react";

import useInput from "../hooks/useInput";

// Reemplazar este arreglo por un pedido al back y traerlo desde Redux
const friends = [
  { id:1, name: "Juan Perez", email: "juanperez@globant.com" },
  { id:2, name: "Maria Gutierrez", email: "mariagomez@globant.com" },
  { id:3, name: "Maximiliano Gutierrez", email: "maxigutierrez@globant.com" },
];

const Friends = ({ show, setShow }) => {
  const handleDeleteFriend = (id)=>{console.log(`eliminar el amigo con id ${id}`)}
  const handleMessageFriend = (id)=>{console.log(`enviar mensaje al amigo con id ${id}`)}
  const searchFriend = useInput('')
  const [filteredFriends, setFilteredFriends] = useState([])
  const showedFriends = (searchFriend.value.length>=3) ? filteredFriends : friends

  // buscar amigos
  useEffect(()=>{
    if(searchFriend.value.length >= 3) {
      const newFriendList = []
      friends.forEach(friend => friend.name.toLowerCase().includes(searchFriend.value.toLowerCase()) ? newFriendList.push(friend) : null)
      setFilteredFriends(newFriendList)
    }
  },[searchFriend.value])

  return (
    <>
      <Modal show={show} onHide={()=>setShow(false)} centered>
        <Modal.Header>
          <Modal.Title style={{fontFamily:"heeboregular"}}>Amigos</Modal.Title>
          <button
            className="main-button"
            onClick={()=>setShow(false)}
          ><BsPlusCircle size={24}/>  Agregar </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Control type="text" {...searchFriend} placeholder="Buscar amigo" />
          </Form>
          <Table style={{fontFamily:"heeboregular",fontWeigth:700}}  responsive hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {showedFriends.map((friend, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{friend.name}</td>
                  <td><BsFillChatTextFill size={20} onClick={()=>handleMessageFriend(friend.id)}/></td>
                  <td><BsFillTrashFill size={20} onClick={()=>handleDeleteFriend(friend.id)}/></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="main-button"
            onClick={()=>setShow(false)}
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Friends;
