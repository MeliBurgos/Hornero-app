import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'

// Reemplazar este arreglo por un pedido al back
const favorites = [
  { id:1, office: "Mar del Plata", desk: "F1D20" },
  { id:2, office: "Bahia Blanca", desk: "F1D3" },
  { id:3, office: "CABA - Puerto Madero", desk: "F4D10" },
  { id:4, office: "CABA - Puerto Madero", desk: "F4D24" },
];

const Favorites = ({ show, setShow }) => {
  const navigate = useNavigate()

  // click sobre el tacho (elimina un favorito)
  const handleDeleteFavorite = (id) => {console.log(`eliminar el puesto con id ${id}`)}
  
  // click sobre un favorito (redirige a esa vista) 
  const handleClick = (officeName) => {
    officeName = officeName.replace(/\s+/g, '_').toLowerCase();
    setShow(false)
    navigate(`/office/${officeName}`)
  }

  return (
    <>
      <Modal show={show} onHide={()=>setShow(false)} centered>
        <Modal.Header>
          <Modal.Title style={{fontFamily:"heeboregular"}}>Oficinas Favoritas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table style={{fontFamily:"heeboregular",fontWeigth:700}}  responsive hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Oficina</th>
                <th>Escritorio</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite, i) => (
                <tr key={i}>
                  <td style={{cursor:"pointer"}} onClick={()=>handleClick(favorite.office)}>{i+1}</td>
                  <td style={{cursor:"pointer"}} onClick={()=>handleClick(favorite.office)}>{favorite.office}</td>
                  <td style={{cursor:"pointer"}} onClick={()=>handleClick(favorite.office)}>{favorite.desk}</td>
                  <td> <BsFillTrashFill style={{cursor:"pointer"}} size={20} onClick={()=>handleDeleteFavorite(favorite.id)}/></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <button className="main-button" onClick={()=>setShow(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Favorites;
