import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";

import { getFavorites, removeFavorite } from "../store/favorites"

const Favorites = ({ show, setShow }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const favorites = useSelector(state => state.favorites)
  const darkMode = useSelector(state => state.darkMode)

  useEffect(()=>{
    dispatch(getFavorites())
  },[])

  // click sobre el tacho (elimina un favorito)
  const handleDeleteFavorite = async (favorite) => {
    try {
      await dispatch(removeFavorite(favorite))
      dispatch(getFavorites())
    } catch (err) {
      console.log(err)
    }
  }
  
  // click sobre un favorito (redirige a esa vista) 
  const handleClick = (officeName) => {
    officeName = officeName.replace(/\s+/g, '_').toLowerCase();
    setShow(false)
    navigate(`/office/${officeName}`)
  }

  return (
    <>
      <Modal show={show} onHide={()=>setShow(false)} centered>
        <Modal.Header className={darkMode? "dark-mode": "light"}>
          <Modal.Title style={{fontFamily:"heeboregular"}}>Oficinas Favoritas</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode? "dark-mode": "light"}>
          <Table className={darkMode? "dark-mode": "light"} style={{fontFamily:"heeboregular",fontWeigth:700}}  responsive hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Oficina</th>
                <th>Escritorio</th>
              </tr>
            </thead>
            <tbody>
              {favorites[0] && favorites.map((favorite, i) => (
                <tr key={i}>
                  <td style={{cursor:"pointer"}} onClick={()=>handleClick(favorite.split(":")[0])}>{i+1}</td>
                  <td style={{cursor:"pointer"}} onClick={()=>handleClick(favorite.split(":")[0])}>{favorite.split(":")[0]}</td>
                  <td style={{cursor:"pointer"}} onClick={()=>handleClick(favorite.split(":")[0])}>{favorite.split(":")[1]}</td>
                  <td> <BsFillTrashFill style={{cursor:"pointer"}} size={20} onClick={()=>handleDeleteFavorite(favorite)}/></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className={darkMode? "dark-mode": "light"}>
          <button className={darkMode?"dark-mode-black-button":"main-button-black"} onClick={()=>setShow(false)}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Favorites;
