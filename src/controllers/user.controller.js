/*
 * Title: User controller
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date:2025/08/21
 */
//Dependencies
const EventModel = require("../models/event.model");
const User = require("../models/user.model");
const utils = require("../utils/utils");

//Get user profile
exports.getProfile = async (req, res, next) => {
  try {
    const _id = utils.newObjectId(req.payload._id);
    const projection = {
      _id: 1,
      name: 1,
      email: 1,
      phoneNumber: 1,
    };
    let user = await User.findById(_id, projection);

    //If no user is found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile fetch successfully",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

//Update user
exports.updateUser = async (req, res, next) => {
  try {
    //Update stage
    const _id = utils.newObjectId(req.payload._id);

    if (req.body.password) {
      delete req.body.password;
    }
    const updatedData = req.body;
    const options = {
      runValidators: true,
      new: true,
      projection: {
        _id: 1,
        name: 1,
        email: 1,
        phoneNumber: 1,
      },
    };
    const updatedUser = await User.findByIdAndUpdate(_id, updatedData, options);

    //If no user is found
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile update successfully",
      data: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

//Get all event for the logged in user
exports.getAllEvents = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) > 50 ? 50 : Number(req.query.limit);
    const sortStage = { $sort: { time: 1 } };
    const skipstage = { $skip: (page - 1) * limit };
    const limitStage = { $limit: limit };
    const projectionStage = {
      $project: {
        updatedAt: 0,
        createdAt: 0,
      },
    };

    const matchStage = {
      $match: {
        createdBy: utils.newObjectId(req.payload._id),
      },
    };

    const events = await EventModel.aggregate([
      matchStage,
      {
        $facet: {
          totalEvents: [{ $count: "count" }],
          events: [sortStage, skipstage, limitStage, projectionStage],
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
    return next(error);
  }
};
