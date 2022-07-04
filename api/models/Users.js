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
    type: Number,
  },
  position: {
    type: String,
  },
  mainOffice: {
    type: String,
  },
  favOffice: {
    type: [String],
    // default: ["MDQ", "Puerto Madero", "Bahía Blanca"],
  },
  favDesk: {
    type: [String],
    default: ["F74D2", "F1D2", "F2D2", "F3D2", "F4D2", "F5D2"],
  },
  friends: {
    type: [String],
    default: [
      "62bc9c7e1c42be68f923f00d",
      "62bc9b99b7985994c71ec087",
      "62ba1cc89003e0aaed7a2ae8",
      "62ba0ba76d5620dff77e0c7b",
      "62b5cb24f3eb5cd956bdc6ae",
    ],
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
    },
  ],
});

module.exports = model("User", UserSchema);
