/*
 * Title: Event model
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/23
 */
//Dependencies
const mongoose = require("mongoose");

//Event Schema
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      minlength: [10, "Description must have at least 10 characters"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
      validate: {
        validator: function (value) {
          return value.getTime() > Date.now();
        },
        message: "Date must be in future",
      },
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      validate: {
        validator: function (value) {
          return /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/i.test(value);
        },
        message: "Please provide 'HH:MM' AM/PM format",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    organizerName: {
      type: String,
      required: [true, "Organization name is required"],
    },
    eventBanner: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Definig event model
const Event = mongoose.model("event", eventSchema);

//Exporting model
module.exports = Event;
