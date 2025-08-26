/*
 * Title: Event Controller
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/24
 */
//Depnendesncies
const EventModel = require("../models/event.model");
const utils = require("../utils/utils");

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
  try {
    const events = await EventModel.aggregate([
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "createdBy",
          as: "user",
          pipeline: [
            {
              $project: {
                password: 0,
                createdAt: 0,
                updatedAt: 0,
              },
            },
          ],
        },
      },
      {
        $addFields: { createdBy: { $arrayElemAt: ["$user", 0] } },
      },
      {
        $project: {
          user: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ]);
    if (!events) {
      return res
        .status(400)
        .json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Events fetch successfully",
      data: events,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
  res.send("Hello from event controller");
};

//Read Single Event
exports.getSingle = async (req, res, next) => {
  try {
    const _id = utils.newObjectId(req.params.id);
    const event = await EventModel.findById(_id);

    //If event not found
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event not found",
      });
    }

    //If event fetch successfully
    return res.status(400).json({
      success: true,
      message: "Event fetch successfully",
    });
  } catch (error) {
    return next(error);
  }
};

//Update Event
exports.update = async (req, res, next) => {};

//Delete Event
exports.delete = async (req, res, next) => {};
