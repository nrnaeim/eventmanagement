/*
 * Title: Main entry point
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/19
 */
//Dependencies
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//Connectinf to DB and Listening app
mongoose.connect(MONGO_URI).then(() => {
  console.log("Data Base connected successfully");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
