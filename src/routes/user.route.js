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
userRoute.get("/profile", userController.getProfile);

//Update user
userRoute.post("/update", userController.updateUser);

//Events created by user
userRoute.get("/events", userController.getAllEvents);

//Exporting user route
module.exports = userRoute;
