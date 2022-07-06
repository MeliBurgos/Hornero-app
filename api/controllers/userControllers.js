const UserSchema= require("../models/Users")
const ReservationsSchema= require("../models/Reservations")

const UserControllers = {
    //busca la reserva
    getAllReservations: async (req, res) => {
        let found= await ReservationsSchema.find({ user: req.params.id})
        res.json(found)
    },
    //traer las reservas de un usiario, en un cierto rango de fecha
    /* getAllReservationsByDate: async (req, res) => {
        let found = await ReservationsSchema.find({
          date: { $gte: req.body.date, $lte: req.body.endDate },
        });
        res.json(found);
    } */
}

  module.exports= UserControllers