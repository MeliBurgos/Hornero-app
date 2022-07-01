import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert"
import { useSelector } from "react-redux";
import { useState } from "react";

import useInput from "../hooks/useInput";
import { sendMailToFriend } from "../store/friends";

const SendMessage = ({ show, setShow, setSendMessage, mailTo }) => {
  const message = useInput();
  const user = useSelector(state => state.user)
  const [showGoodAlert, setShowGoodAlert] = useState(false)
  const [showBadAlert, setShowBadAlert] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const mail = {
      mailFrom: `${user.name} ${user.surname}`,
      mailTo: mailTo.email,
      mailBody: message.value,
    }
    if(message.value.length){
      sendMailToFriend(mail)
      console.log("mensaje enviado")
      setShowGoodAlert(true)
      setTimeout(()=>{
        setSendMessage({})
        setShowGoodAlert(false)
      },2000)
    } else {
      setShowBadAlert(true)
      setTimeout(()=>{
        setShowBadAlert(false)
      },2500)
    }
  }

  return (
    <Modal show={show} onHide={() => {setShow(false);setSendMessage({})}} centered>
      <Modal.Header>
        <Modal.Title style={{ fontFamily: "heeboregular" }}>
          Mensaje para {mailTo.fullname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <form id="form1" onSubmit={handleSubmit}>
            <textarea 
              rows="6" 
              style={{width:"300px"}} 
              {...message} 
              type="text" 
              name='mail_to_friend' 
              placeholder="Qué quieres decirle a tu amigo" 
            />
        </form>
        <Alert variant="success" show={showGoodAlert}>
        Mensaje enviado!
        </Alert>
        <Alert variant="warning" show={showBadAlert}>
        Deberías escribirle algo.
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <button className="main-button-black" onClick={() => setSendMessage({})}>
          Volver
        </button>
        <button form="form1" className="main-button" onClick={handleSubmit}>
          Enviar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendMessage;
