/*
 * Title: Auth middleware
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date:2025/08/21
 */

//Dependencies
const JWT = require("jsonwebtoken");
const utils = require("../utils/utils");
const errorHandler = require("../handlers/error.handler");


//Authentication
exports.authentication = async (req, res, next) => {
  try {
    //  console.log(req.cookies.authToken);
    const payload = JWT.verify(req.cookies.authToken, process.env.JWT_SECRET);
    delete payload.iat;
    delete payload.exp;

    //Adding payload to req
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    const errReason = errorHandler(error);
    return res.status(errReason.code).json({
      success: false,
      error: utils.ensureArray(errReason.error),
    });
  }
};
