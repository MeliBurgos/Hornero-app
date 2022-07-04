const MeetingRoomsSchema = require("../models/MeetingRooms");
const FloorSchema= require("../models/Floor")

const MeetingRoomsController = {
  //busca un rooms por id
  find: async (req, res) => {
    let found = await MeetingRoomsSchema.findById(req.params.id);
    res.json(found);
  },
  // crea un rooms
  create: async (req, res) => {
    let newRoom = await MeetingRoomsSchema.create(req.body);
    let floor= await FloorSchema.findById(req.body.floor)
    floor.meetingRooms.push(newRoom._id)
    floor.save()
    res.json(newRoom);
  },
  //actualiza un rooms
  update: async (req, res) => {
    let updatedRooms = await MeetingRoomsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRooms);
  },
  //elimina un room
  delete: async (req, res) => {
    let deletedRoom = await MeetingRoomsSchema.findByIdAndRemove(req.params.id);
    res.json(deletedRoom);
  },
  //busca todas las reservas rooms
  getAllReservations: async (req, res) => {
    let found= await MeetingRoomsSchema.findById(req.params.id).populate("reservation")
    res.json(found)
  }
};

module.exports = MeetingRoomsController;