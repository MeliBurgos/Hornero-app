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

//rutas offices
const OfficeControlls = require("../controllers/officeControllers");
router.get("/offices", OfficeControlls.all);
router.post("/offices", OfficeControlls.create);
router.get("/offices/:id", OfficeControlls.find);
router.put("/offices/:id", OfficeControlls.update);
router.delete("/offices/:id", OfficeControlls.delete);
router.get("/offices/:id/floors", OfficeControlls.getAllFloors)

//rutas floors
const FloorControlls = require("../controllers/floorControllers");
router.post("/floors", FloorControlls.create);
router.put("/floors/:id", FloorControlls.update);
router.delete("/floors/:id", FloorControlls.delete);
router.get("/floors/:id/desks", FloorControlls.getAllDesks);
//router.get("/floors/:id/meetingRooms", FloorControlls.getAllRooms);

//rutas desks
const DeskControlls = require("../controllers/deskControllers");
router.post("/desks", DeskControlls.create);
router.get("/desks/:id", DeskControlls.find);
router.put("/desks/:id", DeskControlls.update);
router.delete("/desks/:id", DeskControlls.delete);
router.get("/desks/:id/reservations", DeskControlls.getAllReservations);

//rutas meetingRooms
const MeetingRoomsControlls = require("../controllers/meetingRoomsControllers");
router.post("/rooms", MeetingRoomsControlls.create);
router.get("/rooms/:id", MeetingRoomsControlls.find);
router.put("/rooms/:id", MeetingRoomsControlls.update);
router.delete("/rooms/:id", MeetingRoomsControlls.delete);
router.get("/rooms/:id/reservations", MeetingRoomsControlls.getAllReservations);

//rutas reservations
const ReservationControlls = require("../controllers/reservationControllers");
router.post("/reservations", ReservationControlls.create);
router.get("/reservations/:id", ReservationControlls.find);
router.put("/reservations/:id", ReservationControlls.update);
router.delete("/reservations/:id", ReservationControlls.delete);
router.get("reservations/office/:id",  ReservationControlls.getAllReservationsByOffice)

module.exports = router;
