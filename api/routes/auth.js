const router = require("express").Router();
const User = require("../models/Users");

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ error: "El usuario no existe" });
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).send({ error: "El password es incorrecto" });
  }
  const token = jwt.sign({ _id: user._id }, "secret");
  res.send({ token });

  res.header("auth-token", token).json({
    error: null,
    data: {token},
  });
});

module.exports = router;
