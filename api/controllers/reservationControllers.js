// const ReservationsSchema = require("../models/Reservations");

// const ReservationsController = {
//   //crea una reserva
//   create: async (req, res) => {
//     console.log("req.body", req.body);
//     let newReservation = await ReservationsSchema.create(req.body);
//     res.json(newReservation);
//   },
//   //busca una reserva por id
//   find: async (req, res) => {
//     let found = await ReservationsSchema.findById(req.params.id);
//     res.json(found);
//   },
//   //actualiza una reserva
//   update: async (req, res) => {
//     let updatedReservation = await ReservationsSchema.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedReservation);
//   },
//   //elimina una reserva
//   delete: async (req, res) => {
//     let deletedReservation = await ReservationsSchema.findByIdAndRemove(
//       req.params.id
//     );
//     res.json(deletedReservation);
//   },
//   //busca todas las reservas de un usuario por id con autopopulate
//   getAllReservationsByUser: async (req, res) => {
//     let found = await ReservationsSchema.find({ user: req.params.id }).populate(
//       "user"
//     );
//     res.json(found);
//   },

//   //busca todas las reservas de un escritorio por id con autopopulate
//   getAllReservationsByDesk: async (req, res) => {
//     let found = await ReservationsSchema.find({ desk: req.params.id }).populate(
//       "desk"
//     );
//     res.json(found);
//   },
//   //busca todas las reservas de una oficina por id con autopopulate
//   getAllReservationsByOffice: async (req, res) => {
//     let found = await ReservationsSchema.find({
//       office: req.params.id,
//     }).populate("office");
//     res.json(found);
//   },
// };

// module.exports = ReservationsController;
