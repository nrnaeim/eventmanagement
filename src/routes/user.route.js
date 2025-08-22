/*
 * Title: User routes
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date:2025/08/21
 */
//Dependencies
const express = require("express");
const userController = require("../controllers/user.controller");

//User route instance
const userRoute = express.Router();

//Get user profile
userRoute.get("/:id", userController.getUser);

//Exporting user route
module.exports = userRoute;
