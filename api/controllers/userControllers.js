const UserSchema = require("../models/Users");
const ReservationsSchema = require("../models/Reservations");

const UserControllers = {
  //busca la reserva
  getAllReservations: async (req, res) => {
    let found = await ReservationsSchema.find({ user: req.params.id });
    res.json(found);
  },
  //busca todas las reservas de un usuario desde una fecha hasta otra
  // getAllReservationsByDate: async (req, res) => {
  //   let found = await ReservationsSchema.find({
  //     date: { $gte: req.body.date, $lte: req.body.endDate },
  //   });
  //   res.json(found);
  // },
};

module.exports = UserControllers;
