/*
 * Title: Error handler
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/20
 */
//Dependencies
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const multer = require("multer");

//Error handler middleware
const errorHandler = async (error, req, res, next) => {
  try {
    //Validation error handler
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.keys(error.errors).map(
        (key) => error.errors[key].properties.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: errors,
      });
    }

    //MongooseError
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        error: [error.message],
      });
    }

    //MongoServerError
    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      const errors = Object.keys(error.keyValue).map(
        (key) => `${error.keyValue[key]} already exist`
      );
      return res.status(400).json({
        success: false,
        error: errors,
      });
    }

    //Json webtoken error
    if (
      error instanceof JWT.JsonWebTokenError ||
      error instanceof JWT.TokenExpiredError ||
      error instanceof JWT.NotBeforeError
    ) {
      return res.status(400).json({
        success: false,
        message: "Failed to authenticate",
        error: [
          `${error.message.charAt(0).toUpperCase()}${error.message.slice(1)}`,
        ],
      });
    }

    //Multer error handler
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: error.message });
    }
    
    //Default error handler
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Exporting error handler
module.exports = errorHandler;
