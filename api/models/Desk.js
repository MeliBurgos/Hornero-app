const mongoose = require("mongoose");
const { Schema } = mongoose;
const autopopulate = require("mongoose-autopopulate");

const DeskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  office: {
    type: Schema.Types.ObjectId,
    ref: "Office",
    required: true,
    autopopulate: true,
  },
  status: {
    type: String,
    default: "available",
  },
});

module.exports = mongoose.model("Desk", DeskSchema);
