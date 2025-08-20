/*
 * Title: Authentication route
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/20
 */

//Dependencies
const express = require("express");
const authController = require("../controllers/auth.controller");

//Auth route instance
const authRoute = express.Router();

//Register api
authRoute.post("/signup", authController.signUp);
authRoute.post("/signIn", authController.signIn);

//Expotritn auth routes
module.exports = authRoute;
