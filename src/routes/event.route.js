/*
 * Title:
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date:
 */
//Dependencies
const express = require("express");
const upload = require("../middlewares/upload.middleware");
const eventController = require("../controllers/event.controller");

//Event route instance
const eventRoute = express.Router();

//Create Event
eventRoute.post("/create", upload.single("bannar"), eventController.create);

//Read Single Event
eventRoute.get("/:id", eventController.getSingle);

//Read All Events
eventRoute.get("/", eventController.getAll);

//Update Event
eventRoute.put(":id/update", eventController.update);

//Delete Event
eventRoute.delete("/delete", eventController.delete);

//Exporting event route
module.exports = eventRoute;
