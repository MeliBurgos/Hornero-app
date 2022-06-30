const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { sendMailToFriend } = require("../config/mail")

// Traer todos los amigos de 1 usuario
router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    const friends = []
    user.friends.forEach(friendId => friends.push(User.findById(friendId)))
    return Promise.all(friends)
  })
    .then((friends) => {
      friends = friends.map(friend => {
        return {
          _id : friend._id,
          name : friend.name,
          surname : friend.surname,
          email : friend.email,
          telephone : friend.telephone,
          position : friend.position,
          mainOffice : friend.mainOffice,
          imgUrl : friend.imgUrl,
        }
      })
      res.send(friends);
    })
    .catch((err) => console.log(err));
});

// Agregar 1 amigo
router.post("/add/:loggedUserId/:userIdToAdd", (req, res) => {
  User.findByIdAndUpdate(req.params.loggedUserId,{
    '$push': {
      'friends': req.params.userIdToAdd
    }
  })
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
});

// Eliminar 1 amigo
router.delete("/remove/:loggedUserId/:userIdToDelete", (req, res) => {
  User.findByIdAndUpdate(req.params.loggedUserId,{
    '$pull': {
      'friends': req.params.userIdToDelete
    }
  })
  .then(() => res.sendStatus(200))
  .catch((err) => console.log(err));
});

// Enviar mail a un amigo
router.post("/sendMail", (req,res) => {
  const mail = {
    to: req.body.mailTo,
    from: req.body.mailFrom,
    body: req.body.mailBody
  }
  sendMailToFriend(mail)
  res.sendStatus(200)
})

// Buscar entre todos los usuarios (para despues agregar nuevos amigos)
router.get('/search/:searchInput', (req,res) => {
  const search = req.params.searchInput.split(" ")
  if(search.length <= 1) {
    User.find({$or:[
      {name:{$regex: new RegExp(search[0],"i")}},
      {surname:{$regex: new RegExp(search[0],"i")}}
    ]})
    .then(users => {
      users = users.map(user => {
        return {
          _id : user._id,
          name : user.name,
          surname : user.surname,
          mainOffice : user.mainOffice,
        }
      })
      res.send(users)
    })
  } else {
    User.find({name:{$regex: new RegExp(search[0],"i")},surname:{$regex: new RegExp(search[1],"i")}})
    .then(users => {
      users = users.map(user => {
        return {
          _id : user._id,
          name : user.name,
          surname : user.surname,
          mainOffice : user.mainOffice,
        }
      })
      res.send(users)
    })
  }
})

module.exports = router;
