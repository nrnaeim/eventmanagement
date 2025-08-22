/*
 * Title: Authentication controller
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/20
 */
//Dependencies

const JWT = require("jsonwebtoken");
const errorHandler = require("../handlers/error.handler");
const utils = require("../utils/utils");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//Register controller
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    //If new user not return
    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    //If new user created successfully
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    const errReason = errorHandler(error);
    //console.log(errReason);
    return res.status(errReason.code).json({
      success: false,
      message: "Failed to create user",
      error: utils.ensureArray(errReason.error),
    });
  }
};

//Sign in controller
exports.signIn = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    const identifier = email || phoneNumber || password;
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    //Dynamic identifier
    const query = {
      $or: [
        { email: identifier },
        { phoneNumber: identifier },
        { username: identifier },
      ],
    };
    const projection = {
      _id: 1,
      name: 1,
      email: 1,
      phoneNumber: 1,
      password: 1,
    };

    //Finding user
    let user = await User.findOne(query, projection);
    user = user.toObject();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid login credentials",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid login credentials",
      });
    }
    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //Sending response after succefull verification
    delete user.password;

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    };
    return res.cookie("authToken", token, cookieOptions).status(200).json(user);
  } catch (error) {
    const errReason = errorHandler(error);
    return res.status(errReason.code).json({
      success: false,
      message: "Failed to sign in",
      error: utils.ensureArray(errReason.error),
    });
  }
};
