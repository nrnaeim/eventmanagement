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
userRoute.get("/profile", userController.getUser);
//Update user profile
userRoute.put("/update", userController.updateUser);
//Delete user profile
userRoute.delete("/delete", userController.deleteUser);
//Reset password
userRoute.put("/resetPassword", userController.resetPassword);

//Exporting user route
module.exports = userRoute;
