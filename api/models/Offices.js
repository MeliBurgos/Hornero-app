const { Schema, model } = require("mongoose");

const OfficeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  }
});

module.exports = model("Office", { OfficeSchema });
