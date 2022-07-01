const { Schema, model } = require("mongoose")

const MeetingRooms= new Schema({
    name: {
        type: String,
    },
    status: {
        type: String,
        default: "Libre",
    },
    office: [{
        type: Schema.Types.ObjectId, ref: "Offices"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
})

module.exports= model("Rooms", { MeetingRooms })