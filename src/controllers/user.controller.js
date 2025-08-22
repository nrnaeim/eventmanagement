/*
 * Title: User controller
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date:2025/08/21
 */
//Dependencies
const errorHandler = require("../handlers/error.handler");
const User = require("../models/user.model");
const utils = require("../utils/utils");

//Get user profile
exports.getUser = async (req, res) => {
  try {
    const _id = utils.newObjectId(req.params.id);
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
    const errReason = errorHandler(error);
    return res.status(errReason.code).json({
      success: false,
      error: utils.ensureArray(errReason.error),
    });
  }
};
