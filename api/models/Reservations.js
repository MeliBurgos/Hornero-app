const { Schema, model } = require("mongoose");

//CONECTAR CON OFFICES, USERS, MEETINGROOMS, DESKS

const ReservationsSchema = new Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
    default: "18:00"
  },
  allDay: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meetingRoom: {
    type: Schema.Types.ObjectId,
    ref: "Rooms",
    default: null,
  },
  desk: {
    type: Schema.Types.ObjectId,
    ref: "Desk",
    default: null,
  },
});

module.exports = model("Reservations", ReservationsSchema);
