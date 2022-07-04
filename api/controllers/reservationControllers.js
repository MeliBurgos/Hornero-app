const ReservationsSchema = require("../models/Reservations");
const UserSchema= require("../models/Users")

const ReservationsController = {
  //crea una reserva
  create: async (req, res) => {
    let newReservation = await ReservationsSchema.create(req.body);
    let user= await UserSchema.findById(req.body.user)
    user.reservations.push(newReservation._id)
    user.save()
    res.json(newReservation);
  },
  //busca una reserva por id
  find: async (req, res) => {
    let found = await ReservationsSchema.findById(req.params.id);
    res.json(found);
  },
  //actualiza una reserva
  update: async (req, res) => {
    let updatedReservation = await ReservationsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedReservation);
  },
  //elimina una reserva
  delete: async (req, res) => {
    let deletedReservation = await ReservationsSchema.findByIdAndRemove(
      req.params.id
    );
    res.json(deletedReservation);
  },
  //busca todas las reservas de una oficina por id
  getAllReservationsByOffice: async (req, res) => {
    let found = await ReservationsSchema.find({
      office: req.params.id,
    }).populate("office");
    res.json(found);
  },
};

module.exports = ReservationsController;