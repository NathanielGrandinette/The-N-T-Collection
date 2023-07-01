const checkErr = require("../config/errorMsg");
const { node } = require("../config/keys");

const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: checkErr(err),
    stack: node.env === "development" ? err.stack : {},
  });
};

module.exports = { ErrorHandler };
