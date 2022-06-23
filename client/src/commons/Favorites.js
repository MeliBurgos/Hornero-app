import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill } from "react-icons/bs";

// Reemplazar este arreglo por un pedido al back
const favorites = [
  { id:1, office: "Mar del Plata", desk: "F1D20" },
  { id:2, office: "Bahia Blanca", desk: "F1D3" },
  { id:3, office: "CABA - Puerto Madero", desk: "F4D10" },
  { id:4, office: "CABA - Puerto Madero", desk: "F4D24" },
];

const Favorites = ({ show, setShow }) => {
    const handleDeleteFavorite = (id)=>{console.log(`eliminar el puesto con id ${id}`)}

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
                  <td>{i+1}</td>
                  <td>{favorite.office}</td>
                  <td>{favorite.desk}</td>
                  <td><BsFillTrashFill size={20} onClick={()=>handleDeleteFavorite(favorite.id)}/></td>
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
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Favorites;
