const ReservationsSchema = require("../models/Reservations");
const UserSchema= require("../models/Users")

const ReservationsController = {
  //crea una reserva
  create: async (req, res) => {
    console.log(req.body, "req.body")
    let newReservation = await ReservationsSchema.create(req.body);
    let user= await UserSchema.findById(req.body.user)
    user.reservations.push(newReservation)
    user.save()
    console.log(newReservation, "newReservation");
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
    console.log(req.body, "soy req body")
    let found = await ReservationsSchema.find({
      office: req.params.id,
    }).populate("office");
    res.json(found);
  },
   //busca todas las reservas de una oficina entre dos fechas
   getAllReservationsByDate: async (req, res) => {
    const { startDate, endDate } = req.body;
    let found = await ReservationsSchema.find({
      office: req.params.id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate("office");
    res.json(found);
  },
  //busca todas las reservas de un usuario entre dos fechas
  getAllReservationsUserByDate: async (req, res) => {
    const { startDate, endDate } = req.body;
    let found = await ReservationsSchema.find({
      user: req.params.id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate("user");
    res.json(found);
  },
  getAllReservationsByUserAndDate: async (req, res) => {
    // console.log(req.params.id, "req.params.id");
    // const actualDate = new Date();
    // const comparador = "10"
    // console.log(actualDate, "actualDate");
    // actualDate.slice(0, 10);

    let found = await ReservationsSchema.find({

      user: req.params.id ,
      // prueba: { $lte: 10 },
      // startDate: { $lte: ("2022-07-07T20:56:58.010Z") },
    });
    res.json(found);
  }
};

module.exports = ReservationsController;