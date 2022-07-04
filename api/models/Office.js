const mongoose = require("mongoose");
const { Schema } = mongoose;


const OfficeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  //traer los pisos de una oficina
  /* floor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Floor",
    },
  ], */
  reservation: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservations",
    },
  ],
});

module.exports = mongoose.model("Office", OfficeSchema);

