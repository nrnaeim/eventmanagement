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

//API instance
const apiV1 = express.Router();

//Route configuration
apiV1.use("/auth", authRoute);
apiV1.use("/users", middleware.authentication, userRoute);

//Exporting API
module.exports = apiV1;
