const mongoose = require("mongoose");
const { Schema } = mongoose;

//traer referencia de los desks de una oficina

const FloorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  //traer los desks de un piso
  desks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Desk",
    },
  ],
});

module.exports = mongoose.model("Floor", FloorSchema);
