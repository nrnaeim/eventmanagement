/*
 * Title: App
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date:2025/08/19
 */

//Depndencies
const express = require("express");
const cookieParser = require("cookie-parser");

//App instance
const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Route config

//Exporting app
module.exports = app;
