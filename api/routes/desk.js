// const express = require("express");
// const router = express.Router();
// const Desk = require("../models/Desk");
// const Office = require("../models/Office");

// // router.get("/", (req, res) => {
// //   Desk.findOne({id: req.body._id}, function (err, desk) {
// //     Office.populate(desk, { path: "office" }, function (err, desk) {
// //     res.status(200).send(desk);
// //     })
// //     });
// // });

// router.post("/", async (req, res) => {
//   try {
//     const desk = await Desk.create(req.body);
//     res.status(201).send(desk);
//   }
//   catch (err) {
//     res.status(500).send(err);
//   }
// });



// // router.get("/", (req, res) => {
// //   Desk.find({}, function (err, desk) {
// //     Office.populate(desk, { path: "officeId" }, function (err, desk) {
// //       res.status(200).send(desk);
// //     });
// //   });
// // });

// // router.get("/", (req, res) => {
// //   Office.find({}, function (err, office) {
// //     res.send(office);
// //   })
// // })

// module.exports = router;
