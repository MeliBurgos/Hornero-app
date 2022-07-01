const express = require("express");
const router = express.Router();
const user = require("./users");
const favorites = require("./favorites");
const friends = require("./friends")


router.use("/users", user);
router.use("/favorites", favorites);
router.use("/friends", friends);


module.exports = router;
