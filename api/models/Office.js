// const { Schema, model } = require("mongoose");
const mongoose =require("mongoose")
const { Schema } = mongoose; 
const autopopulate = require("mongoose-autopopulate");

//traer referencia de los desks de una oficina

const OfficeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  //traer los desks de una oficina
  desks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Desk",
      autopopulate: true,
    }
  ],
},
);

OfficeSchema.plugin(autopopulate);


module.exports = mongoose.model("Office", OfficeSchema);






