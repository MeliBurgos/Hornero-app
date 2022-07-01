const DeskSchema = require("../models/Desk");

const DeskController = {
  //busca todos los escritorios
  all: async (req, res) => {
    let all = await DeskSchema.find({});
    res.json(all);
  },
  //busca un escritorio por id
  find: async (req, res) => {
    let found = await DeskSchema.findById(req.params.id);
    res.json(found);
  },
  // crea un escritorio
  create: async (req, res) => {
    let newDesk = await DeskSchema.create(req.body);
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
};

module.exports = DeskController;
