/*
 * Title: Event Controller
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/24
 */
//Depnendesncies
const EventModel = require("../models/event.model");

//Create Event
exports.create = async (req, res, next) => {
  try {
    req.body.createdBy = req.payload._id;
    req.body.eventBanner = req.file?.path;

    const newEvent = await EventModel.create(req.body);

    if (!newEvent) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create event" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Event created successfully" });
  } catch (error) {
    next(error);
  }
};

//Read All Events
exports.getAll = async (req, res, next) => {
  res.send("Hello from event controller");
};

//Read Single Event
exports.getSingle = async (req, res, next) => {};

//Update Event
exports.update = async (req, res, next) => {};

//Delete Event
exports.delete = async (req, res, next) => {};
