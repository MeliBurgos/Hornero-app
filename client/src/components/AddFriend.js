import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsPlusCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../hooks/useInput";
import { addFriend, getFriends, searchFriends } from "../store/friends";

const AddFriend = ({ show, setShow, setAddFriend, friends }) => {
    const dispatch = useDispatch()
    const searchUsers = useInput()
    const [filteredUsers, setFilteredUsers] = useState([])
    const showedUsers = (searchUsers.value.length>=3) ? filteredUsers : []
    const friendIds = friends.map(friend => friend._id)
    const user = useSelector(state=> state.user)

    const handleAddFriend = (id)=>{
        dispatch(addFriend({id:user._id,userIdToAdd:id}))
        .then(()=>dispatch(getFriends(user._id)))
    }

    // buscar usuarios para agregar
    useEffect(()=>{
        if(searchUsers.value.length >= 3) {
            dispatch(searchFriends(searchUsers.value))
            .then((users)=>{
                setFilteredUsers(users.payload)
            })
        }
    },[searchUsers.value])

    return (<Modal show={show} onHide={()=>{setShow(false);setAddFriend(false)}} centered>
        <Modal.Header>
            <Modal.Title style={{fontFamily:"heeboregular"}}>Agregar Amigos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={(e) => e.preventDefault()}>
            <input className="main-input" type="text" {...searchUsers} placeholder="Escribe el nombre y/o apellido" />
            </form>
            <Table style={{fontFamily:"heeboregular",fontWeigth:700}}  responsive hover size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Trabaja en</th>
                </tr>
            </thead>
            <tbody>
                {showedUsers.map((user, i) => (
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{`${user.name} ${user.surname}`}</td>
                    <td>{user.mainOffice}</td>
                    {friendIds.includes(user._id) ? <td/> : <td><BsPlusCircle style={{cursor:"pointer"}} size={28} onClick={()=>handleAddFriend(user._id)}/></td>}
                </tr>
                ))}
            </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
            <button className="main-button-black" onClick={()=>setAddFriend(false)}>Volver</button>
            <button
            className="main-button-black"
            onClick={()=>{setShow(false);setAddFriend(false)}}
            >
            Cerrar
            </button>
        </Modal.Footer>
    </Modal>)
};

export default AddFriend;
