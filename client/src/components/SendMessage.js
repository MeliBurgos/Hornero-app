import Modal from "react-bootstrap/Modal";

import useInput from "../hooks/useInput";

const SendMessage = ({ show, setShow, setSendMessage, mailTo }) => {
  const message = useInput();

  const handleSubmit = (e) => {
    e.preventDefault()
    const obj = {
        mailBody: message.value,
        mailTo: mailTo.email
    }
    console.log("submited")
  }

  return (
    <Modal show={show} onHide={() => {setShow(false);setSendMessage({})}} centered>
      <Modal.Header>
        <Modal.Title style={{ fontFamily: "heeboregular" }}>
          Mensaje para {mailTo.fullname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{display:"flex",justifyContent:"center"}}>
        <form id="form1" onSubmit={handleSubmit}>
            <textarea rows="6" style={{width:"300px"}} {...message} type="text" name='mail_to_friend' placeholder="Qué quieres decirle a tu amigo" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="main-button-black" onClick={() => setSendMessage({})}>
          Volver
        </button>
        <button form="form1" className="main-button" onClick={(e) => {handleSubmit(e);setSendMessage({})}}>
          Enviar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendMessage;
