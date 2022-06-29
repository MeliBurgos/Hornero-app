const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { sendMailToFriend } = require("../config/mail")

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

// IMPORTANTE: Tiene que llegar un objeto por body = {mailFrom:'Nombre Apellido', mailTo: 'destinatario@globant.com', mailBody:'cuerpo del mail'}
router.post("/sendMail", (req,res) => {
  const mail = {
    to: req.body.mailTo,
    from: req.body.mailFrom,
    body: req.body.mailBody
  }
  
  sendMailToFriend(mail) // descomentar para enviar el mail
  res.send('<p>Mensaje enviado<p>')
})

module.exports = router;
