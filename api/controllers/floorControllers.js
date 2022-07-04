const FloorSchema = require("../models/Floor");
const OfficeSchema= require("../models/Office")

const FloorController = {
  // crea un piso
  create: async (req, res) => {
    let newFloor = await FloorSchema.create(req.body);
    let office= await OfficeSchema.findById(req.body.office)
    office.floor.push(newFloor._id)
    office.save()
    res.json(newFloor);
  },
  //actualiza un piso
  update: async (req, res) => {
    let updatedFloor = await FloorSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFloor);
  },
  //elimina un piso
  delete: async (req, res) => {
    let deletedFloor = await FloorSchema.findByIdAndRemove(req.params.id);
    res.json(deletedFloor);
  },
  //busca todos los escritorios de un piso
  getAllDesks: async (req, res) => {
    let found = await FloorSchema.findById(req.params.id).populate("desks")
    res.json(found);
  },
  //busca todos los meetingRoooms de un piso
  /* getAllRooms: async (req, res) => {
    let found = await FloorSchema.findById(req.params.id).populate("meetingRooms");
    res.json(found);
  }, */
};

module.exports = FloorController;