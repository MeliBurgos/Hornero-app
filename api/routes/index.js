const express = require("express");
const router = express.Router();
const user = require("./users");
const favorites = require("./favorites");
const friends = require("./friends");

// const desk= require("./desk")
// const offices = require("./offices")

router.use("/users", user);
router.use("/favorites", favorites);
router.use("/friends", friends);

//rutas users
const UserControllers= require("../controllers/userControllers")
router.get("/users/:id/reservations", UserControllers.getAllReservations)
// router.get("/users/:id/reservations/:date", UserControllers.getAllReservationsByDate)

//rutas offices
const OfficeControlls = require("../controllers/officeControllers");
router.get("/offices", OfficeControlls.all);
router.post("/offices", OfficeControlls.create);
router.get("/offices/:id", OfficeControlls.find);
router.put("/offices/:id", OfficeControlls.update);
router.delete("/offices/:id", OfficeControlls.delete);


//rutas reservations
const ReservationControlls = require("../controllers/reservationControllers");
router.post("/reservations", ReservationControlls.create);
router.get("/reservations/:id", ReservationControlls.find);
router.put("/reservations/:id", ReservationControlls.update);
router.delete("/reservations/:id", ReservationControlls.delete);

router.get("/reservations/office/:id", ReservationControlls.getAllReservationsByOffice)

//filtra reservas por fecha de una office
router.get("/reservations/date/:id", ReservationControlls.getAllReservationsByDate)
//filtra reservas por fecha de un usuario
router.get("/reservations/users/date/:id", ReservationControlls.getAllReservationsUserByDate)


module.exports = router;
