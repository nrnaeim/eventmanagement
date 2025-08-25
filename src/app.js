/*
 * Title: App
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date:2025/08/19
 */

//Depndencies
const express = require("express");
const cookieParser = require("cookie-parser");
const apiV1 = require("./api/api.v1");
const errorHandler = require("./handlers/error.handler");

//App instance
const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(express.json());
app.use(cookieParser());

//API config
app.use("/api/v1", apiV1);

//If route is not found
app.use(async (req, res, next) => {
  try {
    return res.status(404).json({
      success: false,
      message: "Opps! page not found",
    });
  } catch (error) {
    return next(error);
  }
});

//Global level error handler
app.use(errorHandler);
//Exporting app
module.exports = app;
