const express = require("express");
const router = express.Router();
const User = require("../models/Users");

router.get("/", (req, res) => {
  // modificar la siguiente linea para que busque todos los amigos de 1 usuario
  User.find()
    /////////////////
    .then((friends) => {
      res.send(friends);
    })
    .catch((err) => console.log(err));
});

router.post("/add/:userIdToAdd", (req, res) => {
  // modificar las siguientes linea para que agregue 1 amigo al usuario logueado
  if (!req.user) return res.send("No hay un usuario logueado");
  User.create()
    /////////////////
    .then((friends) => {
      res.send(friends);
    })
    .catch((err) => console.log(err));
});

router.delete("/delete/:userIdToDelete", (req, res) => {
  // modificar las siguientes linea para que agregue 1 amigo a 1 usuario
  if (!req.user) return res.send("No hay un usuario logueado");
  User.find()
    /////////////////
    .then((friends) => {
      res.send(friends);
    })
    .catch((err) => console.log(err));
});

// para enviar el mail tiene que llegar un objeto por body = {mailTo: 'destinatario@globant.com', subject: 'Titulo del mail', emailBody:'cuerpo del mail'}
router.post("/sendMail", (req,res) => {
    const sender = req.user.email
    //funcion para enviar el mail
    res.send('<p>Mensaje enviado<p>')
})

/*
investigar como enviar un mail
<button class="emailReplyButton" onClick="sendEmail(message)">Reply</button>

sendEmail(message) {
    var email = message.emailId;
    var subject = message.subject;
    var emailBody = 'Hi '+message.from;
    document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
}
*/

module.exports = router;
