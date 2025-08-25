/*
 * Title: Uploader
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/24
 */
//Dependencies
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName = `Banner_${uuidv4()}${fileExt}`;
    return cb(null, fileName);
  },
});

//Uploader
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: function (req, file, cb) {
    const allowedFile = /jpg|jpeg|png/;
    const mimetype = allowedFile.test(file.mimetype);
    const extName = allowedFile.test(file.originalname.toLowerCase());
    if (mimetype && extName) {
      return cb(null, true);
    }
    const err = new multer.MulterError();
    err.code = "LIMIT_FILE_TYPE";
    err.message = "Only jpg, jpeg and png files are allowed";
    return cb(err);
  },
});

//Exporting upload
module.exports = upload;
