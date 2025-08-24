/*
 * Title: API file
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/19
 */
//Dependencies
const express = require("express");
const authRoute = require("../routes/auth.route");
const userRoute = require("../routes/user.route");
const middleware = require("../middlewares/auth.middelware");
const eventRoute = require("../routes/event.route");

//API instance
const apiV1 = express.Router();

//Route configuration
apiV1.use("/auth", authRoute);
apiV1.use("/users", middleware.authentication, userRoute);
apiV1.use("/events", middleware.authentication, eventRoute);

//Exporting API
module.exports = apiV1;
