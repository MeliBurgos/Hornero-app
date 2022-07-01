const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
  },
  salt: {
    type: String,
  },
  telephone: {
    type: Number
  },
  position: {
    type: String,
  },
  mainOffice: {
    type: String,
  },
  favOffice: {
    type: Array,
    // default: ["MDQ", "Puerto Madero", "Bahía Blanca"],
  },
  favDesk: {
    type: Array,
    default: ["F74D2", "F1D2", "F2D2", "F3D2", "F4D2", "F5D2"],
  },
  friends: {
    type: Array,
    default: ["Susana", "Juan", "Pedro", "Maria", "Luis", "Jorge"],
  },
  imgUrl: {
    type: String,
    default:
      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservations",
      autopopulate: true,
    }],
});



module.exports = model("User", UserSchema);
