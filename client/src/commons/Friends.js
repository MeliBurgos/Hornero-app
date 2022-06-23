import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill, BsFillChatTextFill, BsPlusCircle } from "react-icons/bs";

// Reemplazar este arreglo por un pedido al back
const friends = [
  { id:1, name: "Juan Perez", email: "juanperez@globant.com" },
  { id:2, name: "Maria Gomez", email: "mariagomez@globant.com" },
  { id:3, name: "Maximiliano Gutierrez", email: "maxigutierrez@globant.com" },
];

const Friends = ({ show, setShow }) => {
    const handleDeleteFriend = (id)=>{console.log(`eliminar el amigo con id ${id}`)}
    const handleMessageFriend = (id)=>{console.log(`enviar mensaje al amigo con id ${id}`)}

  return (
    <>
      <Modal show={show} onHide={()=>setShow(false)} centered>
        <Modal.Header>
          <Modal.Title style={{fontFamily:"heeboregular"}}>Amigos</Modal.Title>
          <button
            className="main-button"
            onClick={()=>setShow(false)}
          ><BsPlusCircle size={20}/>  Agregar </button>
        </Modal.Header>
        <Modal.Body>
          <Table style={{fontFamily:"heeboregular",fontWeigth:700}}  responsive hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {friends.map((friend, i) => (
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
