const mongoose = require("mongoose");
const { Schema } = mongoose;

const DeskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  floor: {
    type: Schema.Types.ObjectId,
    ref: "Floor",
    required: true,
  },
  reservation: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservations",
    },
  ],
});

module.exports = mongoose.model("Desk", DeskSchema);
