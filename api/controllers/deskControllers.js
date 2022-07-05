const DeskSchema = require("../models/Desk");
const FloorSchema= require("../models/Floor")

const DeskController = {
  //busca un escritorio por id
  find: async (req, res) => {
    let found = await DeskSchema.findById(req.params.id);
    res.json(found);
  },
  // crea un escritorio
  create: async (req, res) => {
    let newDesk = await DeskSchema.create(req.body);
    let floor= await FloorSchema.findById(req.body.floor)
    floor.desks.push(newDesk._id)
    floor.save()
    res.json(newDesk);
  },
  //actualiza un escritorio
  update: async (req, res) => {
    let updatedDesk = await DeskSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDesk);
  },
  //elimina un escritorio
  delete: async (req, res) => {
    let deletedDesk = await DeskSchema.findByIdAndRemove(req.params.id);
    res.json(deletedDesk);
  },
  //busca todas las reservas por escritorio
  getAllReservations: async (req, res) => {
    let found= await DeskSchema.findById(req.params.id).populate("reservation")
    res.json(found)
  }
};

module.exports = DeskController;
