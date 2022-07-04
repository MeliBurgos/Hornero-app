const mongoose = require("mongoose");
const { Schema } = mongoose;

const MeetingRoomsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "available",
  },
  floor: {
    type: Schema.Types.ObjectId,
    ref: "Floor",
    required: true
  },
  reservation: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservations",
    },
  ],
});

module.exports = mongoose.model("Rooms", MeetingRoomsSchema);