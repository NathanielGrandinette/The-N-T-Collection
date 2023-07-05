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

const validateBodyParams = (...params) => {
  const middleware = (req, res, next) => {
    for (const param of params) {
      if (!(param in req.body)) {
        return res.status(400).json({ error: `${param} is required`})
      }
    }

    next()
  }
  return middleware
}

module.exports = { ErrorHandler, validateBodyParams };
