const express = require("express");
const router = express.Router();
// cambiar User por Favorite cuando este el modelo armado
const User = require("../models/Users");
/*
router.get("/", (req, res) => {
  // modificar la siguiente linea para que busque todos los favoritos de 1 usuario
  User.find()
  /////////////////
    .then((favorites) => {
      res.send(favorites);
    })
    .catch((err) => console.log(err));
});

router.get("/add", (req, res) => {
  // modificar la siguiente linea para que agregue 1 favorito a 1 usuario (escritorio en relacion a la oficina)
  User.find()
  /////////////////
    .then((favorites) => {
      res.send(favorites);
    })
    .catch((err) => console.log(err));
});


*/
module.exports = router;
