/*
 * Title: Utils
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date:2025/08/22
 */
//Dependencies
const mongoose = require("mongoose");

//Ensure array
exports.ensureArray = (error) => {
  return Array.isArray(error) ? error : [error];
};

//new Object ID creator from string
exports.newObjectId = (id) => {
  return mongoose.Types.ObjectId.createFromHexString(id);
};
