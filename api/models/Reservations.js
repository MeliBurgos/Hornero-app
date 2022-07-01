const { Schema, model } = require("mongoose");

//CONECTAR CON OFFICES, USERS, MEETINGROOMS, DESKS

const ReservationsSchema = new Schema(
  {
    title: {
      type: String,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    office: {
      type: Schema.Types.ObjectId,
      ref: "Offices",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    meetingRoom: {
      type: Schema.Types.ObjectId,
      ref: "MeetingRooms",
      default: null,
    },
    desk: {
      type: Schema.Types.ObjectId,
      ref: "Desk",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model("Reservations", { ReservationsSchema });
