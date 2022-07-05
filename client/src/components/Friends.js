import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill, BsFillChatTextFill, BsPlusCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../hooks/useInput";
import AddFriend from "./AddFriend";
import { getFriends, removeFriend, sendMailToFriend } from "../store/friends";
import SendMessage from "./SendMessage";

const Friends = ({ show, setShow }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const friends = useSelector((state) => state.friends)
  const searchFriend = useInput()
  const [filteredFriends, setFilteredFriends] = useState([])
  const showedFriends = (searchFriend.value.length>=3) ? filteredFriends : friends
  const [addFriend,setAddFriend] = useState(false)
  const [sendMessage,setSendMessage] = useState({})
  
  useEffect(() => {
    if(user._id) dispatch(getFriends())
  },[user._id])

  const handleDeleteFriend = (id) => {
    dispatch(removeFriend(id))
    .then(() => dispatch(getFriends()))
  }

  // buscar amigos
  useEffect(() => {
    if(searchFriend.value.length >= 3) {
      const newFriendList = []
      const fullnames = friends.map(friend => {
        return {
          _id: friend._id,
          fullname: `${friend.name} ${friend.surname}`,
          name: friend.name,
          surname: friend.surname,
          email: friend.email
        }
      })
      fullnames.forEach(friend => 
        friend.fullname.toLowerCase().includes(searchFriend.value.toLowerCase())
        ? newFriendList.push(friend) 
        : null
      )
      setFilteredFriends(newFriendList)
    }
  },[searchFriend.value])

  if(addFriend) return <AddFriend show={show} setShow={setShow} setAddFriend={setAddFriend} friends={friends} />
  if(sendMessage.email) return <SendMessage show={show} setShow={setShow} setSendMessage={setSendMessage} mailTo={sendMessage} />

  return (
    <>
      <Modal show={show} onHide={()=>setShow(false)} centered>
        <Modal.Header>
          <Modal.Title style={{fontFamily:"heeboregular"}}>Amigos</Modal.Title>
          <button className="main-button" onClick={()=>{setAddFriend(true)}}><BsPlusCircle size={24}/>  Agregar </button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => e.preventDefault()}>
            <input 
              className="main-input" 
              type="text" 
              {...searchFriend} 
              placeholder="Buscar amigo" 
            />
          </form>
          <Table style={{fontFamily:"heeboregular",fontWeigth:700}}  responsive hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {friends[0] ? showedFriends.map((friend, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{`${friend.name} ${friend.surname}`}</td>
                  <td><BsFillChatTextFill 
                    style={{cursor:"pointer"}} 
                    size={20} 
                    onClick={()=>setSendMessage({fullname: `${friend.name} ${friend.surname}`, email: friend.email})}
                  /></td>
                  <td><BsFillTrashFill 
                    style={{cursor:"pointer"}} 
                    size={20} 
                    onClick={()=>handleDeleteFriend(friend._id)}
                  /></td>
                </tr>
              )) : null}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <button className="main-button-black" onClick={()=>setShow(false)}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Friends;
