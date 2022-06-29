const { Schema, model } = require("mongoose")
const Floors= mongoose("Floors")

const DesksSchema = new Schema({
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
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Users',
    // }
})

module.exports= model("Desk", { DesksSchema })