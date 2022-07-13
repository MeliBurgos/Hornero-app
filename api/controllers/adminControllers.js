const UserSchema = require("../models/Users");


const adminController = {
    //actualiza el usuario
  update: async (req, res) => {
    let updatedUser = await UserSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  },
  //trae todos los users
  get: async (req, res) => {
    let foundAllUsers = await UserSchema.find({});
    res.json(foundAllUsers)
  }

}


module.exports= adminController;