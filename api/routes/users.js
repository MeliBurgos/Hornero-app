const express = require("express");
const router = express.Router();
const User = require("../models/Users");

router.post("/register", (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.send(user).status(201);
    })
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
    User.find({})
    .then((users) => {
        res.send(users).status(200);
    })
    .catch((err) => console.log(err));
})

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
  .then((user) => {
    res.send(user).status(200);
  })
  .catch((err) => console.log(err))
})


module.exports = router;
