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

//rutas offices
const OfficeControlls = require("../controllers/officeControllers");
router.get("/offices", OfficeControlls.all);
router.post("/offices", OfficeControlls.create);
router.get("/offices/:id", OfficeControlls.find);
router.put("/offices/:id", OfficeControlls.update);
router.delete("/offices/:id", OfficeControlls.delete);
router.get("/offices/:id/desks", OfficeControlls.getAllDesks);

//rutas desks
const DeskControlls = require("../controllers/deskControllers");
router.get("/desks", DeskControlls.all);
router.post("/desks", DeskControlls.create);
router.get("/desks/:id", DeskControlls.find);
router.put("/desks/:id", DeskControlls.update);
router.delete("/desks/:id", DeskControlls.delete);

//rutas reservations
// const ReservationControlls = require("../controllers/reservationControllers");
// router.post("/reservations", ReservationControlls.create);
// router.get("/reservations/:id", ReservationControlls.find);
// router.put("/reservations/:id", ReservationControlls.update);
// router.delete("/reservations/:id", ReservationControlls.delete);
// router.get("/users/:id/reservations", ReservationControlls.getAllReservationsByUser);
// router.get("/desks/:id/reservations", ReservationControlls.getAllReservationsByDesk);
// router.get("/offices/:id/reservations", ReservationControlls.getAllReservationsByOffice);

module.exports = router;
