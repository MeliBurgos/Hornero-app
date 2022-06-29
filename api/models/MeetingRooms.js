const { Schema, model } = require("mongoose")
const Floors= mongoose("Floors")

const MeetingRooms= new Schema({
    name: {
        type: String,
    },
    status: {
        type: String,
        default: "Libre",
    },
    office: [{
        type: Schema.Types.ObjectId, ref: ""
    }]
})

module.exports= model("Rooms", { MeetingRooms })