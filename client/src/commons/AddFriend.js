import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsPlusCircle } from "react-icons/bs";
import { useEffect, useState } from "react";

import useInput from "../hooks/useInput";

// reemplazar por la lista de usuarios que coinciden con los valores de busqueda
const users = [
    { id: 2, name: "Maria Gutierrez", email: "mariagomez@globant.com", mainOffice: "Mar Del Plata" },
    { id: 4, name: "Federico Lopez", email: "federicolopez@globant.com", mainOffice: "Bahia Blanca"  },
    { id: 5, name: "Maria Estefania Fernandez", email: "estefaniafernandez@globant.com", mainOffice: "Mar Del Plata"  },
    { id: 3, name: "Maximiliano Gutierrez", email: "maxigutierrez@globant.com", mainOffice: "Mar Del Plata"  },
    { id: 6, name: "Estevan Urquiza", email: "estevanurquiza@globant.com", mainOffice: "Bahia Blanca"  },
    { id: 1, name: "Juan Perez", email: "juanperez@globant.com", mainOffice: "Mar Del Plata"  },
    { id: 7, name: "Estevan Gutierrez", email: "estevangutierrez@globant.com", mainOffice: "Mar Del Plata"  },
    { id: 8, name: "Estevan Perez", email: "estevanperez@globant.com", mainOffice: "Bahia Blanca"  },
];

const AddFriend = ({ show, setShow, setAddFriend, friends }) => {
    const searchUsers = useInput()
    const [filteredUsers, setFilteredUsers] = useState([])
    const showedUsers = (searchUsers.value.length>=3) ? filteredUsers : []
    const friendIds = friends.map(friend => friend.id)

    const handleAddFriend = (id)=>{console.log(`agregar a la lista de amigos el user con id ${id}`)}

    // buscar usuarios para agregar
    useEffect(()=>{
        if(searchUsers.value.length >= 3) {
            // ACA hacer pedido al back y traer los usuarios que contengan searchUsers.value
            // .then((users)=>setFilteredUsers(users))
            
            // borrar la siguiente linea
            setFilteredUsers(users)
        }
    },[searchUsers.value])

    return <Modal show={show} onHide={()=>{setShow(false);setAddFriend(false)}} centered>
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
                    <td>{user.name}</td>
                    <td>{user.mainOffice}</td>
                    {friendIds.includes(user.id) ? <td/> : <td><BsPlusCircle style={{cursor:"pointer"}} size={28} onClick={()=>handleAddFriend(user.id)}/></td>}
                </tr>
                ))}
            </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
            <button className="main-button" onClick={()=>setAddFriend(false)}>Volver</button>
            <button
            className="main-button-black"
            onClick={()=>{setShow(false);setAddFriend(false)}}
            >
            Cerrar
            </button>
        </Modal.Footer>
    </Modal>;
};

export default AddFriend;
