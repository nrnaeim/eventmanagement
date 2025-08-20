/*
 * Title: User model
 * Description: This model will define user data model
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/20
 */
//Dependencies

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Min lenght of name is 3"],
      maxlength: [50, "Max lenght of name is 50"],
      match: [/^[a-z ]{3,50}$/i, "Name can contains letters and space only"],
    },
    email: {
      type: String,
      requied: [true, "Email is required"],
      unique: [true, "Email already exist"],
      tolowercase: true,
      match: [/^[a-z0-9._-]+@[a-z]+\.[a-z]{2,}$/i, "Invalid email"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number already exist"],
      match: [/^01[3-9]{1}[0-9]{8}$/, "Please provide a valid phone number"],
    },
    password: {
      type: String,
      requied: [true, "Password is required"],
      minlength: [6, "Min password lenght is 6"],
      maxlength: [32, "Max password lenght is 50"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%&])[A-Za-z\d@!$%&]{6,32}$/,
        "Not a strong password",
      ],
    },
    confirmPassword: {
      type: String,
      requied: [true, "Password is required"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password not match",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  try {
    this.confirmPassword = undefined;
    if (this.isModified("password")) {
      const hash = bcrypt.hashSync(this.password, 10);
      this.password = hash;
      return next();
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

//Defining model
const User = mongoose.model("user", userSchema);

//Exporting model
module.exports = User;
