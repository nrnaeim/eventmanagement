/*
 * Title: Error handler
 * Description:
 * Author: Niemur Rahman
 * Email: nrnaeim@gmail.com
 * Date: 2025/08/20
 */
const errorHandler = (error) => {
  //Validation error handler
  if (error.name === "ValidationError") {
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].properties.message
    );

    return {
      code: 400,
      error: errors,
    };
  }

  //MongooseError
  if (error.name === "MongooseError") {
    return {
      code: 400,
      error: error.message,
    };
  }

  //MongoServerError
  if (error.name === "MongoServerError" && error.code === 11000) {
    const errors = Object.keys(error.keyValue).map(
      (key) => `${error.keyValue[key]} already exist`
    );
    return {
      code: 400,
      error: errors,
    };
  }
  
  //Default error handler
  return {
    code: 500,
    error: "Internal server error",
  };
};

//Exporting error handler
module.exports = errorHandler;
