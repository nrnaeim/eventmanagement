/*
 * Title: Authentication controller
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/20
 */
//Dependencies

const errorHandler = require("../handlers/error.handler");
const User = require("../models/user.model");

//Register controller
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    //If new user not return
    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    //If new user created successfully
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    const errReason = errorHandler(error);
    //console.log(errReason);
    return res.status(errReason.code).json({
      success: false,
      message: "Failed to create user",
      error: Array.isArray(errReason.error)
        ? errReason.error
        : [errReason.error],
    });
  }
};
