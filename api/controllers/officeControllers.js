const OfficeSchema = require("../models/Office");

const OfficeController = {
  //busca todas las oficinas
  all: async (req, res) => {
    let all = await OfficeSchema.find({});
    res.json(all);
  },
  //busca una oficina por id
  find: async (req, res) => {
    let found = await OfficeSchema.findById(req.params.id);
    res.json(found);
  },
  //crea una oficina
  create: async (req, res) => {
    let newOffice = await OfficeSchema.create(req.body);
    res.json(newOffice);
  },
  //actualiza una oficina
  update: async (req, res) => {
    let updatedOffice = await OfficeSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOffice);
  },
  //elimina una oficina
  delete: async (req, res) => {
    let deletedOffice = await OfficeSchema.findByIdAndRemove(req.params.id);
    res.json(deletedOffice);
  },
  
};

module.exports = OfficeController;
