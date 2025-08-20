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

//API instance
const apiV1 = express.Router();

//Route configuration
apiV1.use("/auth", authRoute);

//Exporting API
module.exports = apiV1;
